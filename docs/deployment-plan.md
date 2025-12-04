# 배포 및 CI/CD 플랜 (Deployment Plan)

이 문서는 현재 MVP 단계의 프로젝트를 Azure VM에 배포하고, GitHub Actions를 통해 CI/CD 파이프라인을 구축하기 위한 계획입니다.

## 1. 배포 아키텍처

- **Hosting**: Azure VM (Standard_B2ats_v2 / Ubuntu 24.04 LTS)
- **Containerization**: Docker
- **Registry**: GitHub Container Registry (GHCR)
- **CI/CD**: GitHub Actions
- **Reverse Proxy**: Nginx (SSL/TLS 적용 - Let's Encrypt)
- **Database**: Supabase (Managed PostgreSQL) - _기존 사용 유지_

## 2. 상세 진행 단계

### Step 1: Docker 설정 (Containerization)

Next.js 애플리케이션을 도커 이미지로 빌드하기 위한 설정을 추가합니다.

- **`next.config.ts` 수정**: `output: 'standalone'` 옵션 추가 (이미지 크기 최적화)
- **`Dockerfile` 생성**:
  - Multi-stage build 적용 (deps, builder, runner)
  - pnpm/npm 패키지 매니저 설정
- **`.dockerignore` 생성**: 불필요한 파일 제외

### Step 2: CI/CD 파이프라인 구축 (GitHub Actions)

GitHub Actions를 사용하여 빌드 및 배포 과정을 자동화합니다.

- **Workflow 파일 생성**: `.github/workflows/deploy.yml`
- **CI (Continuous Integration)**:
  - 코드 체크아웃
  - 의존성 설치 및 린트(Lint) 검사
  - 빌드 테스트 (`npm run build`)
- **CD (Continuous Deployment)**:
  - Docker 이미지 빌드
  - GHCR에 이미지 푸시 (Tag: `latest` & `sha`)
  - Azure VM 접속 및 배포 스크립트 실행 (SSH)

### Step 3: Azure VM 서버 설정

배포를 위한 서버 환경을 구성합니다.

- **인스턴스 생성 및 보안 그룹 설정**:
  - Inbound: SSH(22), HTTP(80), HTTPS(443)
- **Docker & Docker Compose 설치**
- **Swap Memory 설정**: Standard_B2ats_v2 사용 시 메모리 부족 방지 (2GB 권장)

### Step 4: Nginx 및 SSL 설정

도메인 연결 및 HTTPS 보안 연결을 설정합니다.

- **Nginx 설치 및 설정**: Reverse Proxy 설정 (Port 80 -> 3000)
- **SSL 인증서 발급**: Certbot (Let's Encrypt) 사용

## 3. 환경 변수 관리

프로덕션 환경 변수는 보안을 위해 다음과 같이 관리합니다.

- **GitHub Secrets**: CI/CD 과정에서 필요한 변수 (`DOCKER_PASSWORD`, `SSH_KEY` 등)
- **Azure VM `.env` 파일**: 서버에서 실행 시 필요한 런타임 변수 (`DATABASE_URL`, `NEXTAUTH_SECRET` 등)
  - _초기 배포 시 서버에 직접 생성하거나, 안전한 방법으로 주입_

## 4. 실행 계획 (Action Plan)

1. **Docker 설정 적용**
   - `next.config.ts` 수정
   - `Dockerfile`, `.dockerignore` 작성
   - 로컬 빌드 테스트

2. **GitHub Actions 설정**
   - 워크플로우 파일 작성
   - GitHub Repository Secrets 등록

3. **서버 프로비저닝 (사용자 진행 필요)**
   - Azure VM 인스턴스 생성 (Standard_B2ats_v2 / Ubuntu 24.04 LTS)
   - 공용 IP (Public IP) 할당 (선택)
   - 도메인 DNS 설정 (선택)

4. **최초 배포 및 검증**
   - 파이프라인 실행
   - 서버 접속 확인
   - 기능 점검 (로그인, DB 연동 등)
