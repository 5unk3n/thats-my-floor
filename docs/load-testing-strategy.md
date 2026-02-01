# 부하 테스트 전략 (Load Testing Strategy)

## 1. 개요 (Overview)

본 문서는 **Issue #134 - 부하 테스트 및 인프라 한계점 파악**을 위한 테스트 전략과 분석 결과를 정리합니다.

- **목표**: 현재 인프라 환경에서 시스템이 견딜 수 있는 최대 트래픽(Arrival Rate)과 성능이 급격히 저하되는 임계점(Saturation Point) 파악
- **시나리오**: 알림 발송으로 인한 접속 폭주(Notification Blast)
- **트래픽 특성**: Read-Heavy, Spike 패턴 (단순 조회 위주, 결제 트랜잭션 없음)

---

## 2. 시나리오 정의

### 2.1. Notification Blast 시나리오

푸시 알림 발송 후 사용자들이 앱에 접속하는 트래픽 패턴을 시뮬레이션합니다.

#### 트래픽 패턴 (업계 표준 데이터 기반)

| 시간대     | 트래픽 특성                       | 클릭 비율              |
| ---------- | --------------------------------- | ---------------------- |
| **0~5분**  | "Hammer Effect" - 급격한 스파이크 | 전체 클릭의 **40~60%** |
| **5~30분** | 기준선 대비 높은 트래픽 유지      | -                      |
| **~6시간** | Long tail - 트래픽의 **90%** 완료 | -                      |

> **핵심**: 서버 부하 테스트는 **0~5분 구간에 집중**해야 함

#### 클릭률 벤치마크 (엔터테인먼트/이벤트 도메인)

| 유형                            | 평균 CTR   | 상위 10%  |
| ------------------------------- | ---------- | --------- |
| 모바일 앱 Push                  | 3.5~6.2%   | 12%+      |
| 웹 Push                         | 2.8~5.1%   | 8.5%+     |
| **이벤트/티켓팅 (긴급성 높음)** | **10~15%** | FOMO 효과 |

> **이 서비스 적용**: 공연 등록 알림을 보고 들어오는 사용자는 긴급성이 높으므로 **CTR 10~15% 가정**이 합리적

### 2.2. 사용자 행동 흐름

```
알림 클릭 → 알림 페이지(/notifications) → 공연 상세(/concerts/[id])
```

**핵심 타겟 엔드포인트**:

- `/` - 메인 페이지 (공연 목록)
- `/concerts/[id]` - 공연 상세 ⭐ (가장 핵심)
- `/notifications` - 알림 목록

---

## 3. 현재 인프라 스펙

### 3.1. 리소스 구성

| 컴포넌트           | 스펙                                            | 비고                   |
| ------------------ | ----------------------------------------------- | ---------------------- |
| **Application VM** | Standard B2ats v2 (2 vCPU, 1GiB RAM)            | + 2GB Swap Memory      |
| **Database**       | Standard_B1ms (1 vCore, 2GiB RAM, **120 IOPS**) | P4 디스크              |
| **Prisma**         | 기본 설정 (connection_limit 미설정)             | 기본 커넥션 풀 ~5~10개 |

#### 실제 가용 메모리 분석

> **중요**: 1GiB RAM 스펙이지만 실제 사용 가능한 메모리는 OS 및 시스템 데몬에 의해 크게 감소합니다.

| 항목                       | 메모리 사용량 | 비고                        |
| -------------------------- | ------------- | --------------------------- |
| **총 물리 메모리**         | 847MB         | OS 오버헤드 후 실제 가용량  |
| dockerd + containerd       | ~68MB         | Docker 런타임               |
| cloudflared                | ~27MB         | Cloudflare Tunnel           |
| Azure Monitor Agent        | ~40MB         | 모니터링 에이전트           |
| 기타 시스템 프로세스       | ~100MB        | multipathd, WALinuxAgent 등 |
| **Next.js (Idle)**         | **~142MB**    | standalone 빌드 기준        |
| buff/cache                 | ~230MB        | 파일 시스템 캐시            |
| **실제 부하 시 Available** | **~275MB**    | 이 범위 내에서 부하 처리    |

### 3.2. 병목 지점 (우선순위 순 - 테스트 결과 기반)

> **검증됨**: 부하 테스트를 통해 실제 병목 지점이 확인되었습니다.

| 우선순위 | 컴포넌트          | 잠재적 병목            | 리스크 상세                                                                                           |
| -------- | ----------------- | ---------------------- | ----------------------------------------------------------------------------------------------------- |
| **1**    | **Memory**        | **GC Thrashing**       | 실제 가용 메모리 ~275MB에서 부하 증가 시 V8 GC가 빈번해지며 Event Loop 차단 → Latency 급증 (6.9s~35s) |
| **2**    | **VM CPU**        | **GC로 인한 CPU 점유** | GC 수행 시 싱글 스레드 CPU 100% 도달, 요청 처리 차단                                                  |
| **3**    | **DB Connection** | Connection Pool 고갈   | `use cache` 전략으로 인해 **실제 테스트에서는 병목 발생하지 않음**                                    |

> **핵심 발견**: 캐시 시스템이 DB를 효과적으로 보호하므로, **메모리가 유일한 실질적 병목**입니다.

---

## 4. 응답 시간 Baseline 측정

### 4.1. 측정 결과 (2026-01-30)

```bash
# 메인 페이지
curl -w "TTFB: %{time_starttransfer}s" https://thatsmyfloor.live/
→ TTFB: 0.214s

# 공연 상세 (Cold - 캐시 미스)
curl -w "TTFB: %{time_starttransfer}s" https://thatsmyfloor.live/concerts/[id]
→ TTFB: 2.254s

# 공연 상세 (Warm - 캐시 히트)
→ TTFB: 0.070s
```

| 페이지    | 캐시 상태 | TTFB       | 평가         |
| --------- | --------- | ---------- | ------------ |
| 메인      | -         | **214ms**  | ✅ 양호      |
| 공연 상세 | 🔴 Cold   | **2.25초** | ⚠️ 느림      |
| 공연 상세 | 🟢 Warm   | **70ms**   | ✅ 매우 빠름 |

### 4.2. 캐시 효과 분석

- **Cold vs Warm 차이**: 32배 (2.25초 → 70ms)
- **캐시 전략**: `'use cache'` + `cacheLife('max')` 적용됨

```typescript
// src/features/concerts/model/services/concert.service.ts
export const getConcertDetail = async (id: string) => {
  'use cache';
  cacheLife('max'); // 풀 페이지 캐싱
  cacheTag(`concert-detail-${id}`);
  // ...
};
```

### 4.3. 캐싱 동작 상세

**같은 공연에 대한 Notification Blast 시:**

```
[알림: "공연 A가 등록되었습니다!"]
         ↓
사용자 1번 → /concerts/A → 🔴 Cold (DB 조회 O) → 캐시 저장
사용자 2번 → /concerts/A → 🟢 Warm (DB 조회 X)
사용자 3번 → /concerts/A → 🟢 Warm (DB 조회 X)
   ...
사용자 100번 → /concerts/A → 🟢 Warm (DB 조회 X)
```

| 요청 순서  | DB 조회 | 응답 시간 |
| ---------- | ------- | --------- |
| **1번째**  | ✅ 발생 | ~2.25초   |
| **2번째~** | ❌ 없음 | ~70ms     |

> **핵심**: 같은 공연에 대해서는 DB IOPS 병목이 거의 발생하지 않음

### 4.4. Cold 요청 2.25초 원인 분석

공연 상세 조회 시 발생하는 DB 쿼리:

| 순서 | 함수                                   | 설명                                    |
| ---- | -------------------------------------- | --------------------------------------- |
| 1    | `findConcertById(id)`                  | Concert + ConcertArtist + Artist JOIN   |
| 2    | `findMusicBrainzArtistsByMbids(mbids)` | 아티스트 이름 조회 (Internal Mirror DB) |

추가로 첫 요청 시(Cold Start) 리스크:

- **Rendering Overhead**: PPR (Partial Prerendering) 구조이나, Cold 요청 시 동적 스트리밍 부분 처리를 위한 리소스 소모.

### 4.5. DB IOPS가 병목이 되는 경우

```
[시나리오: 여러 공연 알림 동시 발송 -> Cold Start 다발]

알림 1: "공연 A 등록!" → 50명 진입 → Cold 1회 (DB Connect)
알림 2: "공연 B 등록!" → 50명 진입 → Cold 1회 (DB Connect)
...
알림 N: "공연 N 등록!" → 50명 진입 → Cold 1회 (DB Connect)
         ↓
동시에 5개 이상의 Cold 요청 발생 시 Connection Pool(Size: 5) 고갈
```

> **핵심**: IOPS보다 **Connection Pool 고갈**이 훨씬 먼저 찾아올 것임.

---

## 5. 부하 시나리오 수치화

### 5.1. 구독자 규모별 예상 부하

| 시나리오 | 구독자   | CTR 10% (클릭 수) | 5분 내 유입 (클릭의 50%) | Arrival Rate (접속 시도/sec) |
| -------- | -------- | ----------------- | ------------------------ | ---------------------------- |
| 소규모   | 1,000명  | 100명             | 50명                     | **~0.17 iter/s**             |
| 중규모   | 5,000명  | 500명             | 250명                    | **~0.83 iter/s**             |
| 대규모   | 10,000명 | 1,000명           | 500명                    | **~1.66 iter/s**             |

> **계산식**: `5분 내 유입` ÷ `300초` = `Arrival Rate`

### 5.2. 테스트 시나리오 분류

| 시나리오              | 설명                                 | 주요 병목 예상                   |
| --------------------- | ------------------------------------ | -------------------------------- |
| **A. 단일 공연 알림** | 같은 공연 상세 반복 조회 (Warm 중심) | Node.js 처리량 (CPU), 네트워크   |
| **B. 다중 공연 알림** | 서로 다른 공연 랜덤 조회 (Cold 중심) | **DB Connection Pool**, 외부 API |

### 5.3. 예상 한계점 및 가설

#### 시나리오 A: 단일 공연 (Warm - Cache Hit)

- **메커니즘**: 파일/메모리에서 정적 HTML 서빙. DB 연결 없음.
- **메모리**: 낮음 (Node.js 기본 오버헤드 + 전송 버퍼).
- **한계 요인**: CPU (요청 처리 속도) 또는 네트워크 대역폭.
- **예상 성능**: 1GB 2vCPU에서도 수백~수천 RPS 처리가 가능할 것으로 예상.

#### 시나리오 B: 다중 공연 (Cold - Cache Miss)

- **메커니즘**: SSR 수행 + DB 조회 + 외부 API 호출.
- **메모리**: 높음 (객체 생성, 렌더링). **OOM 위험**.
- **DB**: Connection Pool 사용. 동시 요청 5~10개 넘어가면 대기열(Queue) 발생.
- **예상 성능**: 동시 Cold 요청 5~10개(Pool Size) 수준에서 병목 시작. Arrival Rate가 이를 초과하면 Latency 급증.

### 5.4. 요약

| 시나리오             | 테스트 방식         | 주요 관전 포인트                    |
| -------------------- | ------------------- | ----------------------------------- |
| **단일 공연 (Warm)** | Ramping ArrivalRate | CPU 100% 도달 시점, 응답 속도       |
| **다중 공연 (Cold)** | Constant Rate       | **DB Connection Timeout**, 500 에러 |

---

## 6. 테스트 계획

### 6.1. 테스트 도구

- **k6**: Grafana Labs의 오픈소스 부하 테스트 도구
- 선정 이유: JavaScript 기반, 가볍고 CI/CD 친화적, 상세한 메트릭 제공

### 6.2. 테스트 단계

| 단계 | Executor 유형   | 목적                   | Target Rate            | Duration        |
| ---- | --------------- | ---------------------- | ---------------------- | --------------- | ------ |
| 1    | **Smoke Test**  | `constant-vus`         | 스크립트 오류 검증     | 1 VU            | 30초   |
| 2    | **Load Test**   | `ramping-arrival-rate` | 실제 트래픽 패턴 모사  | Target까지 증가 | 5~10분 |
| 3    | **Stress Test** | `ramping-arrival-rate` | 한계점(Breaking Point) | 2x Target       | 10분+  |

### 6.3. 성공 기준

- **P95 Response Time**:
  - **Warm**: < **200ms** (Google RAIL Model "Instant" feel 기준)
  - **Cold**: < **2.0s** (일반적인 웹 허용 한계, Nielsen Norman Group)
- **Error Rate**: < 1%
- 목표 부하(Arrival Rate)에서 5분간 처리량 유지 (Throughput Drop 없음)

---

## 7. 다음 단계 (TODO)

- [x] 목표 구독자 규모 확정 (1,000 / 5,000 / 10,000)
- [x] k6 테스트 스크립트 작성
- [x] Smoke → Load → Stress 순서로 테스트 실행
- [x] 결과 분석 및 병목 구간 도출
- [x] 인프라 개선 방안 제시

---

## 참고 자료

- [Push Notification CTR Benchmarks 2024](https://clevertap.com/)
- [Google Web Vitals & RAIL Model](https://web.dev/rail/)
- [Nielsen Norman Group - Response Times](https://www.nngroup.com/articles/response-times-3-important-limits/)
- [Azure VM B-series Specs](https://learn.microsoft.com/azure/virtual-machines/sizes-b-series-burstable)

---

## 8. 테스트 결과 및 결론 (Test Results & Conclusion)

**2026-01-31 수행된 k6 부하 테스트(Local Env) 결과 요약입니다.**

### 8.1. 테스트 수행 결과

| 시나리오                | 목표 부하 (Arrival Rate) | 결과 (Result)            | P95 Latency | Error Rate | 주요 병목 (Bottleneck)                            |
| :---------------------- | :----------------------- | :----------------------- | :---------- | :--------- | :------------------------------------------------ |
| **A. 단일 공연 (Warm)** | **10 RPS**               | ✅ **성공 (Stable)**     | **29.89ms** | **0.00%**  | 없음 (매우 안정적)                                |
| **A. 단일 공연 (Warm)** | **20 RPS**               | ✅ **성공 (Safe Max)**   | **28.90ms** | **0.00%**  | **Memory Limited** (Available 115MB - Cliff Edge) |
| **A. 단일 공연 (Warm)** | **30 RPS**               | ⚠️ **불안정 (Unstable)** | **6.9s**    | 0.29%      | **Processing Queueing / Memory Pressure**         |
| **A. 단일 공연 (Warm)** | **50 RPS**               | ❌ **실패 (Fail)**       | **35.67s**  | 2.57%      | **Node.js CPU / GC Thrashing**                    |
| **B. 다중 공연 (Cold)** | **10 RPS**               | ✅ **성공 (Stable)**     | **40.19ms** | 0.00%      | 없음 (캐시 효과로 인해 Warm 전환)                 |

### 8.2. 상세 분석

#### 1) 10~20 RPS (분당 600~1,200명 유입) 달성

- 현재 인프라 구조에서 **알림 발송 직후 분당 1,200명의 동시 유입**은 안정적으로 처리 가능합니다.
- `Next.js Data Cache`가 DB를 효과적으로 보호하며, 응답 속도도 P95 기준 30ms 대로 매우 빠릅니다.

#### 2) 임계점(Breaking Point) 발견: ~24 RPS

- **30 RPS**: Latency가 30ms → **4~7초**로 급증 (Cliff Edge 패턴)
- Nginx 에러 로그: `upstream timed out while connecting/reading from upstream`
- **현상**: Node.js가 요청을 처리하지 못하고 Nginx에서 timeout 발생

#### 3) 병목 원인 분석 (vmstat 모니터링 기반)

> **핵심 발견**: CPU/Memory가 여유 있는데 Node.js가 응답 못함

| 지표            | 부하 중              | 분석                                |
| --------------- | -------------------- | ----------------------------------- |
| **CPU idle**    | 90-97%               | ✅ CPU 여유로움                     |
| **free memory** | 60-80MB              | ⚠️ 약간 감소하지만 급격한 고갈 없음 |
| **swap in/out** | 0-28                 | ✅ Swap thrashing 없음              |
| **Nginx 에러**  | `upstream timed out` | 🚨 Node.js가 응답 못함              |

**결론**: 메모리나 CPU 고갈이 아닌, **Node.js 싱글 스레드 Event Loop 처리량 한계**가 병목 원인.

- Node.js는 싱글 스레드로 동작
- 동시 요청이 많으면 **내부 큐에 쌓임**
- 큐가 차면 새 연결을 받지 못하거나 응답 지연 → Nginx timeout

#### 4) V8 힙 제한 실험 결과 (실패)

`--max-old-space-size=200` 적용 테스트 결과:

| 지표                 | Baseline | V8 제한 (200MB) | 변화    |
| -------------------- | -------- | --------------- | ------- |
| P95 Latency (30 RPS) | 7.2s     | **7.45s**       | ❌ 악화 |
| Error Rate           | 0.22%    | **0.42%**       | ❌ 악화 |
| Dropped Iterations   | 136      | **299**         | ❌ 악화 |

> **결론**: V8 힙 제한은 GC를 더 자주 발생시켜 오히려 **성능을 악화**시킴. **권장하지 않음**.

#### 5) 캐시 시스템의 견고함 (Resilience)

- `use cache` (Function-level Caching) 전략이 매우 효과적임이 입증되었습니다.
- URL Query String을 변경(`bypass`)하여 공격적인 요청을 보내도, 내부적으로 함수 인자(`id`) 기반으로 캐싱되므로 DB 부하가 발생하지 않았습니다.
- 이는 **DB Connection Pool 고갈 리스크가 예상보다 훨씬 낮음**을 의미합니다.

### 8.3. 최종 결론

> **"현재 시스템의 안정적인 처리 한계(Capacity)는 약 20~24 RPS 입니다."**
>
> **"이는 Node.js 싱글 스레드 Event Loop의 처리량 한계로, 스케일 업/아웃 또는 클러스터 모드로 해결 가능합니다."**

- **안정권 (Safe)**: **10~20 RPS** (분당 600~1,200명 유입). 응답속도 < 50ms 유지.
- **포화 상태 (Saturating)**: **24 RPS**. 이 지점을 넘으면 요청이 Queue에 쌓이기 시작하여 Latency가 초 단위로 급증함.
- **위험권 (Danger)**: **>30 RPS**. 구독자 10,000명 이상 대상 알림 발송 시 트래픽 분산(Throttling) 또는 Scale-out 필수.

### 8.4. 개선 방안

#### 시도했으나 효과 제한적 (비권장)

| 방법                  | 결과                | 비고                                        |
| --------------------- | ------------------- | ------------------------------------------- |
| ~~V8 힙 크기 제한~~   | ❌ 오히려 성능 악화 | GC 빈도 증가로 Event Loop 차단 증가         |
| **PM2 클러스터 모드** | ⚠️ 제한적 개선      | 30% 개선되나 1GB RAM에서는 메모리 경합 발생 |

##### PM2 클러스터 모드 실험 결과

| RPS    | 싱글 모드           | 클러스터 (2개)        | 변화        |
| ------ | ------------------- | --------------------- | ----------- |
| **30** | P95 7.2s            | P95 4.15s             | ⚠️ 42% 개선 |
| **50** | P95 35s, 2.57% 에러 | P95 21.9s, 5.37% 에러 | ⚠️ 38% 개선 |

> **분석**: 클러스터 모드는 Event Loop를 2개로 늘리지만, 1GB RAM을 2개 프로세스가 나눠 사용하면서 메모리 경합이 발생하여 효과가 제한적임.

#### 처리량 증가 권장 방안

| 방법                 | 변경 사항              | 예상 효과           |
| -------------------- | ---------------------- | ------------------- |
| **스케일 업 (권장)** | B2ms (4GB RAM)         | ~50+ RPS 처리 가능  |
| **스케일 아웃**      | 2개 VM + Load Balancer | 2x 처리량, 고가용성 |
| **알림 Throttling**  | 발송 시 50ms 간격 분산 | 피크 부하 완화      |

### 8.5. 외부 벤치마크 비교

| 환경                    | 스펙            | SSG RPS    | 출처           |
| ----------------------- | --------------- | ---------- | -------------- |
| **TransIP BladeVPS X4** | 4GB RAM, 2 vCPU | 193 RPS    | martijnhols.nl |
| **저가 VPS (Nuxt SSR)** | 알 수 없음      | 15 RPS     | pausanchez.com |
| **우리 환경**           | 1GB RAM, 2 vCPU | **20 RPS** | 실측           |

> **결론**: 1GB RAM 환경에서 20 RPS는 **합리적인 수치**입니다. 외부 벤치마크(4GB RAM에서 193 RPS)와 비교해도, RAM 4배 차이를 고려하면 정상 범위입니다.

### 8.6. 최종 권장사항

현재 **20 RPS (분당 1,200명)** 처리 가능하며, 이는 대부분의 알림 시나리오에 충분합니다.

```
구독자 1,200명 이하: 현재 인프라로 충분
구독자 3,000명 이상: 알림 Throttling 적용 권장
구독자 10,000명 이상: 스케일 업(4GB) 또는 스케일 아웃 필수
```
