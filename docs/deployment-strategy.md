# 배포 및 CI/CD 전략 (Deployment Strategy)

이 문서는 Azure VM 및 GitHub Actions를 활용한 프로젝트의 최신 배포 아키텍처와 **블루/그린(Blue/Green) 무중단 배포** 및 **안전한 DB 마이그레이션 전략**을 설명합니다.

## 1. 배포 아키텍처

- **Cloud Infrastructure**: Azure VM (Standard_B2ats_v2 / Ubuntu 24.04 LTS)
- **Containerization**: Docker + Docker Compose
- **Container Registry**: GitHub Container Registry (GHCR)
- **CI/CD Orchestration**: GitHub Actions
- **Database**: Supabase (Managed PostgreSQL)
- **Network & Security**:
  - **Inbound**: Cloudflare Tunnel (or Nginx Reverse Proxy with SSL on port 443/80)
  - **Traffic Management**: Nginx (Blue/Green Switching)

---

## 2. CI/CD 파이프라인 상세

전체 파이프라인은 **GitHub Hosted Runner**에서 실행되는 **CI (Build)** 단계와, **Azure VM (Self-hosted Runner)**에서 실행되는 **CD (Deploy)** 단계로 구분됩니다.

### Phase 1: Continuous Integration (CI)

> **환경**: `ubuntu-latest` (GitHub Hosted Runner)
> **트리거**: `main` 브랜치 Push

1.  **Source Code Checkout**: 최신 코드를 가져옵니다.
2.  **Build & Push Docker Image**:
    - `Dockerfile`의 Multi-stage build를 수행합니다.
    - **Build Secret Mount**: `.env` 파일 등 민감 정보를 `RUN --mount=type=secret` 방식으로 안전하게 주입하여 이미지 레이어에 남지 않게 합니다.
    - **SSG Safety Check**: `generateStaticParams` 함수 내에서 `process.env.CI`를 감지하여, DB 연결 없이 빈 배열을 반환함으로써 마이그레이션 전 빌드 실패를 방지합니다.
    - 빌드된 이미지를 `ghcr.io`에 `latest` 및 `sha` 태그로 푸시합니다.

### Phase 2: Continuous Deployment (CD)

> **환경**: Azure VM (Self-hosted Runner)
> **트리거**: Phase 1(Build-and-Push) 성공 시 자동 실행

1.  **Deploy Environment Setup**:
    - GitHub Secrets에서 `ENV_FILE_CONTENT`를 가져와 런타임용 `.env` 파일을 생성합니다.
    - `npm ci`를 실행하여 마이그레이션 스크립트 실행에 필요한 의존성을 설치합니다.
2.  **Zero-downtime DB Migration (Expand)**:
    - `npx prisma migrate deploy`를 실행합니다.
    - **Expand 전략**: 현재 운영 중인 Blue 컨테이너에 영향을 주지 않도록, 새로운 컬럼/테이블을 **추가(Add)**하는 변경사항만 적용됩니다.
3.  **Blue/Green Deployment (`scripts/deploy.sh`)**:
    - **Target Recognition**: Nginx 설정을 확인하여 현재 비활성 상태인 환경(Green 또는 Blue)을 배포 대상으로 선정합니다.
    - **Image Pull & Run**: 최신 Docker 이미지를 Pull하고, 대상 컨테이너(`app-green` 등)를 실행합니다.
    - **Health Check**: `curl`을 통해 `localhost:PORT/api/health` 엔드포인트를 주기적으로 호출하여 서비스 정상 구동을 확인합니다.
4.  **Traffic Switch**:
    - Health Check 통과 시, Nginx 설정(Symlink)을 변경하여 트래픽을 새 컨테이너로 전환합니다.
    - `sudo systemctl reload nginx`로 무중단 적용합니다.
5.  **Cleanup**:
    - 구 버전(Blue) 컨테이너를 중지(Stop)하고 제거(Remove)하여 리소스를 확보합니다.
    - (Optional) `.env` 파일 보안 삭제.

---

## 3. 데이터베이스 마이그레이션 전략 (Expand and Contract)

무중단 배포 환경에서 "서비스 중인 앱(Blue)"과 "새로 배포되는 앱(Green)"이 공존하는 시점의 DB 충돌을 막기 위해 **확장 후 축소(Expand and Contract)** 전략을 사용합니다.

### 3-1. 전략 개요

DB 스키마 변경을 한 번에 하지 않고, **하위 호환성을 유지하는 여러 단계**로 나누어 배포합니다.

### 3-2. 실행 단계

1.  **Expand (확장) - [현재 배포 단계]**
    - **행동**: 새로운 컬럼이나 테이블을 **추가**합니다.
    - **규칙**: 추가되는 컬럼은 반드시 `Nullable`이거나 `Default Value`를 가져야 합니다. 기존 앱(Blue)이 이 컬럼을 모르기 때문입니다.
    - **결과**: Blue 앱(구버전)과 Green 앱(신버전) 모두 문제없이 동작합니다.
2.  **Migrate (전환) - [앱 로직 변경]**
    - **행동**: 신버전 앱(Green)이 새로운 컬럼을 사용하여 데이터를 읽고 씁니다.
    - **결과**: 트래픽이 Green으로 완전히 넘어가면 데이터는 새로운 구조로 쌓이기 시작합니다.
3.  **Contract (축소) - [다음 배포 또는 별도 정리]**
    - **행동**: 더 이상 사용되지 않는 구버전 컬럼이나 테이블을 **삭제(Drop)**합니다.
    - **시점**: 롤백 가능성을 확보하기 위해, 최소 1회 배포 주기 이후나 별도의 "Technical Debt Day"에 수행하는 것을 권장합니다.

---

## 4. 보안 전략 (Security)

### 4-1. Runner 보안

- **Self-hosted Runner**: VM 내부에서 직접 배포 스크립트를 실행하므로 권한 관리가 필수적입니다.
- **Access Control**: Public 리포지토리로 전환 시, 반드시 Settings에서 **"Require approval for all outside collaborators"** 옵션을 켜야 합니다. 이를 통해 외부인의 Fork PR이 내 서버에서 임의 코드를 실행하는 것을 차단합니다.

### 4-2. Secret 관리

- **Build Time**: Docker BuildKit Secret Mount를 사용하여 이미지 내 시크릿 잔존을 원천 차단합니다.
- **Run Time**: 런타임 환경변수는 GitHub Secrets로 관리되며, 배포 시점에만 파일로 주입됩니다.
