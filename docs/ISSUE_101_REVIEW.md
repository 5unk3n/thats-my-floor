# [Review] Issue #101: 렌더링 전략 최적화 (ISR & Streaming)

## 1. 현황 분석 및 문제점 (Current Status & Problems)

### 1.1 메인 페이지 (`(main)/page.tsx`)

- **현재 구현**:
  - `export const dynamic = 'force-dynamic'` 설정으로 인해 Full Route Cache가 비활성화되어 매 요청마다 DB 쿼리 및 HTML 생성이 발생합니다.
  - **Sequential Fetching (Waterfall)**: 국내, 내한, 페스티벌 공연 데이터를 `await`로 순차 호출하고 있어 응답 속도(TTFB)가 느립니다.
    ```typescript
    // 현재 코드의 문제점
    const domesticRes = await getConcerts(...); // 1. 대기
    const intlRes = await getConcerts(...);     // 2. 대기
    const festivalsRes = await getConcerts(...); // 3. 대기
    ```
  - **Server Action 혼용**: `getConcerts`는 `use server`가 선언된 Server Action입니다. 이는 주로 Mutation(Form 제출 등)을 위해 설계되었으며, 컴포넌트 내부에서 데이터를 가져오는 용도(Query)로 사용할 경우 Next.js의 `fetch` 캐싱 메커니즘과 자연스럽게 통합되지 않을 수 있습니다.

### 1.2 공연 상세 페이지 (`(main)/concerts/[id]/page.tsx`)

- **현재 구현**:
  - `concertService.getConcertDetail`이 Prisma를 통해 직접 DB를 조회하며 캐싱이 적용되지 않았습니다.
  - `generateStaticParams`가 구현되지 않아, 모든 상세 페이지가 유저 요청 시점에(On-demand) 렌더링됩니다. 트래픽이 몰릴 경우 DB 부하가 우려됩니다.

### 1.3 아티스트 상세 페이지 (`(main)/artists/[id]/page.tsx`)

- **현재 구현**:
  - `Promise.all`로 기본적인 데이터 페칭 병렬화는 되어 있습니다.
  - **[치명적 문제] 개인화 데이터 혼합**: `getFollowStatus(id)`는 로그인한 사용자의 세션 정보(`getServerSession`)에 의존합니다.
  - 이 함수가 페이지 최상단에서 await 되는 순간, 해당 페이지는 **절대 정적(Static)으로 빌드되거나 캐싱될 수 없습니다.** 사용자에 따라 다른 내용을 보여줘야 하기 때문에 Next.js는 이를 Dynamic Rendering으로 처리합니다. 이슈에서 목표로 한 "Static Shell" 전략은 현재 구조에서는 불가능합니다.

---

## 2. 설계 비판 및 개선 제안 (Critique & Proposal)

Issue #101의 목표는 적절하나, 구체적인 구현 계획에서 보완이 필요합니다.

### 2.1 메인 페이지: 병렬 처리 및 캐싱 레이어 도입

- **제안 1**: `Promise.all`을 사용하여 데이터 페칭을 병렬화해야 합니다.
- **제안 2**: Server Action이 아닌 **Cached DAL (Data Access Layer)** 패턴을 사용하십시오.
  - Next.js 16의 새로운 **`'use cache'`** 지시어(Directive)를 사용하여 DB 쿼리 함수를 캐싱 함수로 변환합니다.
  - `cacheTag`, `cacheLife` 등의 관련 API를 활용하여 캐시 수명과 재검증 정책을 제어할 수 있습니다.
  - _참고: `unstable_cache`는 Next.js 16에서 `'use cache'`로 대체되는 추세이며, `'use cache'`가 더 권장되는 최신 방식입니다._

### 2.2 공연 상세: 정적 파라미터 생성 및 Tag 기반 갱신

- **제안 1**: `generateStaticParams`를 도입하여 접근 빈도가 높은 공연 페이지(예: 최근 등록된 100개)는 빌드 시점에 미리 생성(Prerendering)하는 것을 권장합니다.
- **제안 2**: `revalidatePath` 대신 `revalidateTag`를 활용하여 더욱 정교한 캐시 무효화를 구현합니다.

### 2.3 아티스트 상세: User-Specific 데이터의 격리 (Isolation)

- **제안**: "Static Shell"을 달성하려면 **개인화 데이터(팔로우 여부)**를 페이지 렌더링 과정에서 분리해야 합니다.
  - `getFollowStatus` 호출을 페이지 컴포넌트에서 제거합니다.
  - 대신 `<Suspense>`로 감싸진 별도의 컴포넌트(예: `<ArtistFollowSection />`) 내부에서 데이터를 가져오거나, Client Component에서 호출하도록 변경합니다.
  - 이렇게 해야 껍데기(Shell)와 공통 데이터(아티스트 정보)는 정적으로 캐싱하고, 팔로우 버튼 부분만 동적으로 스트리밍할 수 있습니다.

---

## 3. 수정된 실행 계획 (Revised Implementation Plan)

### Step 1: 캐싱 유틸리티 및 DAL 구성

- [ ] `concertService`, `artistService`의 DB 조회 메서드에 `'use cache'` 지시어 적용.
- [ ] `next.config.ts`에서 `cacheComponents: true` 사용 설정.
- [ ] 각 데이터별 Cache Tag 설계 (예: `concert:[id]`, `artist:[id]`, `concerts:list`).

### Step 2: 메인 페이지 최적화

- [ ] `src/app/(main)/page.tsx`의 `force-dynamic` 제거.
- [ ] `getConcerts` 호출부를 병렬(`Promise.all`)로 변경 및 Cached DAL 함수로 교체.

### Step 3: 공연 상세 페이지 최적화

- [ ] `src/app/(main)/concerts/[id]/page.tsx`에 `generateStaticParams` 추가.
- [ ] `revalidateTag`를 활용한 데이터 갱신 로직 확인.

### Step 4: 아티스트 상세 페이지 리팩토링 (PPR/Streaming)

- [ ] **Follow 로직 분리**: `getFollowStatus`를 사용하는 `<ArtistFollowButton>` 컴포넌트 생성 (Server Component + Suspense 또는 Client Component).
- [ ] 페이지 레벨에서는 순수 아티스트 정보만 조회하여 Static Rendering 가능하도록 변경.
## 4. Q&A: 왜 Page-level ISR 대신 `use cache`인가? (Why 'use cache' over ISR?)

사용자분께서 질문 주신 **"왜 전통적인 ISR(Page-level) 대신 `use cache` (Component/Function-level)를 사용하는가?"**에 대한 답변입니다.

### 4.1 "Dynamic by Default"와 유연한 결합

- **ISR (기존 방식)**: 페이지 단위(`export const revalidate = ...`)로 캐싱합니다.
  - **한계**: 페이지 내에 **하나라도** 동적인 요소(쿠키, 헤더, 로그인 사용자 정보)가 있으면, 페이지 전체가 Dynamic Rendering으로 전환되거나, 이를 피해가기 위해 복잡한 구조(Client Component로 위임 등)를 잡아야 합니다.
  - 예: 메인 페이지 상단에 "안녕하세요, **000**님"을 띄우려면 ISR을 포기해야 하거나, 정보 부분을 Skeleton 처리하고 클라이언트에서 가져와야 핪니다.

- **`use cache` (Next.js 16 방식)**: **데이터(함수)** 또는 **UI(컴포넌트)** 단위로 캐싱합니다.
  - **장점**: 페이지 자체는 Dynamic(`force-dynamic`이 없더라도, 쿠키 접근 시 자동 Dynamic)이어도 상관없습니다.
  - **동작**: "사용자 로그인 정보 확인"은 매 요청마다 수행되지만(Dynamic), "무거운 공연 데이터 DB 조회"는 `use cache`로 인해 0ms 수준으로 캐시된 결과를 반환합니다.
  - 즉, **동적인 껍데기(Shell) 안에 정적인 데이터(Data)**를 자유롭게 섞을 수 있습니다.

### 4.2 데이터와 렌더링의 의존성 제거 (Decoupling)

- **Cached DAL (Data Access Layer)** 패턴의 핵심입니다.
- 데이터를 가져오는 함수(`getConcerts`) 자체가 캐싱되면, 이 함수를 메인 페이지에서 쓰든, 사이드바에서 쓰든, API 라우트에서 쓰든 **항상 캐시된 성능**을 보장받습니다.
- 반면 ISR은 "페이지"에 묶여 있으므로, 같은 데이터를 다른 페이지에서 쓸 때 중복 호출이 발생하거나 Revalidation 로직이 파편화될 수 있습니다.

### 4.3 정확한 Revalidation (On-demand)

- 순수 시간 기반 ISR은 "데이터가 수정되어도 1시간 동안은 옛날 내용이 보임"이라는 단점이 있습니다.
- `use cache` + `cacheTag`를 사용하면, 관리자가 공연 정보를 수정하는 즉시 `revalidateTag`를 통해 **관련된 데이터만** 정밀하게 갱신할 수 있습니다.
- 이는 사용자에게 항상 최신 정보를 빠르고 효율적으로 제공하게 합니다.

---
## 5. 심화 Q&A: `use cache` vs ISR 상세 비교

상세한 질문 감사드립니다. 질문해주신 내용에 대한 답변을 정리해 드립니다.

### Q1. 메인 페이지가 정적이라도 `use cache`가 더 좋은가?

**A. 네, 그렇습니다.**

- **미래 지향적 설계**: 현재는 정적이지만, 나중에 "로그인 유저의 닉네임 표시" 등 사소한 동적 기능이 추가되는 순간 기존의 Page-level ISR은 깨지거나 복잡해집니다. `use cache`는 데이터만 캐싱하므로 이런 변화에 유연합니다.
- **중복 제거 (Deduplication)**: `getConcerts` 함수 자체가 캐싱되면, 이 함수를 다른 페이지(예: 사이드바, 검색 API)에서 호출해도 DB 부하 없이 캐시된 데이터를 공유합니다.

### Q2. `use cache`도 빌드 시점에 생성되는가? 서스펜스되는가?

**A. 빌드 시 생성 + 클라이언트 서스펜스 여부는 선택적입니다.**

- **빌드 타임 생성**: `use cache`가 적용된 함수/컴포넌트가 **정적 파라미터**만 사용한다면, 빌드 시점에 실행되어 결과(JSON/HTML)가 저장됩니다. (기존 SSG/ISR과 동일 효과)
- **포함 여부**: 메인 페이지가 정적(`force-dynamic` 제거)이라면, 캐시된 컴포넌트의 HTML은 초기 응답에 **포함**되어 내려옵니다. (Client-side fetching 아님)
- **Suspense**: 만약 데이터가 아직 캐싱되지 않았거나(Miss), 동적 파라미터에 의존해서 느리다면 자동으로 Suspense 되어 스트리밍됩니다. 캐싱(Hit)된 상태라면 즉시 렌더링됩니다.

### Q3. 파라미터가 바뀌면 캐시를 못 쓰는가?

**A. 네, 별개의 캐시 키로 저장됩니다.**

- `getConcerts({ page: 1 })`과 `getConcerts({ page: 2 })`는 서로 다른 입력값(Argument)을 가지므로, Next.js가 자동으로 다른 키를 생성하여 저장합니다. 즉, 파라미터별로 캐싱됩니다.

### Q4. 기존 계획(Time-based ISR + On-demand) vs `use cache` 비교

**A. `use cache`가 사용자분의 기존 의도를 더 완벽하게 구현합니다.**

- **기존 계획**: 1시간 주기 ISR + `revalidateTag`
- **`use cache` 구현**:

  ```typescript
  // 정확히 동일한 로직을 함수 레벨에서 구현
  import { unstable_cache } from 'next/cache'; // or 'use cache' directive

  async function getConcerts() {
    'use cache';
    cacheLife({ stale: 3600 }); // 1시간 동안은 캐시된 값 사용 (보험용)
    cacheTag('concerts');       // 태그 등록
    return db.query(...);
  }
  ```

- **차이점**: 기존 방식은 "페이지 전체"를 갱신해야 하지만, 이 방식은 "데이터만" 갱신하므로 훨씬 효율적입니다. 트리거 로직(`revalidateTag`)은 동일하게 작동합니다.

### Q5. `use cache`는 Stale-While-Revalidate(SWR)로 동작하는가?

**A. 네, 기본적으로 백그라운드 갱신(SWR)을 지원합니다.**

- 설정한 시간(예: 1시간)이 지나고 요청이 들어오면:
  1. **즉시 반환**: 만료된(Stale) 캐시 값을 먼저 사용자에게 보여줍니다. (Blocking 없음, 빠름)
  2. **백그라운드 갱신**: 서버 뒤단에서 새로운 데이터를 가져와 캐시를 업데이트합니다.
  3. **다음 요청**: 업데이트된 최신 값을 보여줍니다.
- 이는 기존의 ISR 동작 방식과 동일하며, Next.js 16의 `cacheLife` 설정(`stale`, `revalidate`, `expire`)을 통해 이 동작을 더 정교하게 제어할 수 있습니다.
### Q6. 레이아웃과 ISR의 관계 (Layout vs Page ISR)

**A. 레이아웃은 포함되지 않거나, Client Component라면 무관합니다.**

- **동작 원리**: Next.js의 레이아웃은 페이지를 감싸는 상위 컴포넌트입니다.
  - 만약 `Header`가 Sever Component이고 동적 데이터(쿠키 등)를 직접 사용한다면, 하위 페이지가 아무리 정적이라도 전체 루트는 Dynamic으로 풀릴 수 있습니다.
  - 하지만, 말씀하신대로 `Header`가 **Client Component**(`'use client'`)라면, 서버 빌드 시점에는 정적인 껍데기(Placeholder)만 포함되고 실제 내용은 브라우저에서 채워집니다. 따라서 메인 페이지의 정적 생성(SSG/ISR)을 방해하지 않습니다.
- **결론**: `Header`가 Client Component라면 메인 페이지는 문제없이 정적으로 생성됩니다.

### Q7. Suspense는 언제 필수인가? (Suspense Necessity)

**A. "동적일 수 있는 부분"에는 필수라고 이해하시면 편합니다.**

- **정적 파라미터**: 입력값이 고정(Static)되어 있어 빌드 시점에 결과를 알 수 있다면, Next.js가 미리 HTML을 다 만들어둡니다. 기다릴 필요가 없으니 Suspense가 없어도 즉시 화면이 나옵니다.
- **Suspense가 필요한 경우**:
  1. **데이터가 아직 없을 때 (Cache Miss)**: 캐시된 값이 없어서 서버에서 DB를 조회해야 할 때, 빈 화면 대신 로딩바를 보여주기 위해 필요합니다.
  2. **동적 파라미터**: 검색어(`?q=...`)처럼 사용자가 뭘 입력할지 모르는 경우, 미리 만들어둘 수 없습니다. 이 경우 DB 조회 시간 동안 기다려야 하므로 Suspense가 필요합니다.
- **요약**: `use cache`를 쓴다고 무조건 Suspense가 필요한 건 아니지만, **"캐시가 없거나 갱신 중일 때 사용자에게 로딩 상태를 보여주려면"** 사용하는 것이 좋습니다. (PPR의 핵심)
# [Final Review] 최종 전략 평가 및 의견 (Final Strategy Evaluation)

사용자께서 결정하신 최종 전략에 대한 비판적 검토 및 의견입니다.

## 1. 메인 페이지: Page-level ISR (적합)

- **판단**: **적합합니다 (Approved).**
- **근거**:
  - 개인화 요소가 없고, 페이지 전체 갱신이 목표라면 `use cache`보다 **Page-level ISR**이 구현 비용이 가장 낮고 직관적입니다.
  - 1시간 주기 + On-demand Revalidation(`revalidatePath`) 조합은 트래픽 급증 시에도 안정적인 성능을 보장하는 표준 패턴입니다.
  - **주의점**: `(main)/layout.tsx`에 있는 Header가 세션 쿠키를 읽거나 하면 ISR이 풀릴 수 있으므로, Header가 확실히 Client Component인지 확인해야 합니다. (이미 확인됨)

## 2. 공연 상세 페이지: SSG + On-demand ISR (적합)

- **판단**: **매우 적합합니다 (Highly Recommended).**
- **근거**:
  - `generateStaticParams`로 인기 공연/최신 공연 페이지를 미리 빌드해두는 것은 TTFB 성능에 결정적입니다.
  - **제안**: 모든 공연을 다 빌드하면 빌드 시간이 너무 길어지므로, **"최근 등록된 100개"** 또는 **"예매 중인 공연"** 등으로 범위를 좁혀서 빌드하는 것이 현실적입니다. 나머지는 첫 요청 시 생성(fallback: blocking)되도록 합니다.

## 3. 아티스트 상세 페이지: Static Shell + Cache Component

### 3-1. 팔로우 버튼: Server Component + Suspense vs Client Fetching?

- **의견**: **Client Component 내부 Fetching (React Query)**을 더 권장합니다.
- **비교**:
  - **옵션 A (Server Component + Suspense)**: 서버에서 `getFollowStatus` 질의. 초기 HTML에 포함되나, 유저별로 스트리밍 연결이 필요해 서버 리소스를 소모합니다.
  - **옵션 B (Client Fetching)**: 페이지 껍데기는 완벽하게 정적(Static)으로 서빙됩니다. 브라우저에서 `useEffect` (또는 React Query)로 팔로우 여부만 쏙 가져옵니다.
- **권장 이유**: 팔로우 상태는 "중요한 SEO 콘텐츠"가 아니고, 즉각적인 사용자 상호작용(Mutation)이 일어나는 영역이므로 **Client Side Fetching**이 아키텍처상 가장 깔끔합니다. 이렇게 하면 페이지 전체를 CDN에 100% 캐싱할 수 있습니다.

### 3-2. 참여 공연 목록: Cache Component?

- **판단**: **적극 권장합니다 (Approved).**
- **근거**:
  - 아티스트의 공연 목록은 자주 변하지 않으면서 DB 부하가 큰 쿼리입니다.
  - `cacheTag('artist-concerts-' + artistId)`로 캐싱해두면, 아티스트 페이지를 방문하는 모든 사람에게(로그인 여부 상관없이) 0ms로 응답할 수 있습니다.
  - 만약 새 공연이 추가되면 해당 태그만 revalidate 하면 됩니다.

---

## 🚀 최종 구현 로드맵 (Final Roadmap)

1. **메인 페이지**: `export const revalidate = 3600` 추가, `getConcerts` 병렬화.
2. **공연 상세**: `generateStaticParams` 구현 (Limit 100).
3. **아티스트 상세**:
   - `getFollowStatus` 제거 → `<FollowButton />` (Client Component)에서 `useQuery` 등으로 처리.
   - 공연 목록 섹션은 `suspend` 감싸고, 내부 데이터 fetching에 `'use cache'` 적용.

이 계획으로 진행하시겠습니까?
## 6. 최종 합의 (Final Consensus)

사용자분의 날카로운 지적을 반영하여 최종 구현 계획을 확정합니다.

### 6.1 메인 페이지: `revalidateTag` 기반 데이터 캐싱

- **변경**: 단순 Page-level ISR 대신, **Data-level caching (`use cache` + `cacheTag`)** 전략을 채택합니다.
- **이유**: 말씀하신 대로 태그(`concerts-list`, `concert-detail` 등)를 사용하면 메인 페이지뿐만 아니라 해당 데이터를 사용하는 **모든 곳(검색, 아티스트 상세 등)**의 캐시를 한 번에 효율적으로 관리할 수 있습니다.
- **전략**:
  - `getConcerts`에 `use cache` 적용.
  - `cacheTag('concerts-main')` 등 태그 부여.
  - 데이터 변경 시 `revalidateTag` 호출.

### 6.2 공연 상세: SSG 범위 구체화

- **전략**: `generateStaticParams`에서 **`status: "UPCOMING"`(공연예정)**인 공연 중 **최신 100개**만 빌드 시 생성합니다.
- **효과**: 빌드 속도 저하를 막으면서도, 사용자가 가장 많이 찾을 '예매 가능한 최신 공연'의 속도를 최적화합니다.

### 6.3 아티스트 상세: Client Fetching & Cache Component

- **팔로우 버튼**: **Client Component (`useEffect` / `react-query`)**에서 페칭하여 정적 껍데기(Static Shell)를 유지합니다.
- **참여 공연 목록**: **Cache Component (`use cache`)**를 사용하여 서버에서 캐싱된 HTML을 즉시 반환합니다.

---

**이제 위 합의된 내용대로 코드를 작성하겠습니다.**
