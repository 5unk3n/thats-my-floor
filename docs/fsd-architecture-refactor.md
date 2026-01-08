# 아키텍처 리팩터링 제안서: Entities 레이어 도입

## 1. 배경 및 목적

현재 프로젝트는 **Vertical Slice Architecture**를 기반으로 `features`와 `shared` 레이어를 사용하고 있습니다. 그러나 프로젝트 규모가 커짐에 따라 다음과 같은 문제가 발생하고 있습니다:

1.  **순환 참조 문제**: Feature 간의 상호 의존성 발생 (예: `concerts` 기능이 `artists` 컴포넌트를 필요로 하고, `artists` 기능이 `concerts` 데이터를 필요로 함).
2.  **비즈니스 로직의 모호함**: 순수 도메인 로직(Entity)과 사용자 유즈케이스(Feature)가 `features` 디렉토리 안에 혼재되어 재사용성이 떨어짐.

이를 해결하기 위해 **Feature-Sliced Design (FSD)**의 표준 레이어인 **`entities`** 레이어를 도입하여 구조를 개선하고자 합니다.

---

## 2. 변경된 레이어 구조 (Layered Concept)

FSD의 원칙에 따라 의존성 방향은 항상 **위에서 아래(단방향)**여야 합니다.

```
Layouts/Pages (App)  ↘
        Widgets      ↘
        Features     ↘
        Entities     ↘
         Shared
```

### 각 레이어의 역할 정의

| 레이어       | 역할                                                         | 예시 (Component/Logic)                                | 의존성 규칙                                              |
| :----------- | :----------------------------------------------------------- | :---------------------------------------------------- | :------------------------------------------------------- |
| **App**      | 애플리케이터 설정, 라우팅, 전역 스타일                       | `layout.tsx`, `providers`, `global.css`               | 모든 레이어 사용 가능                                    |
| **Features** | **사용자 시나리오/유즈케이스**. 사용자와의 상호작용 처리     | `LoginForm`, `ConcertBooking`, `ReviewWriter`         | `Entities`, `Shared` 사용 가능                           |
| **Entities** | **비즈니스 도메인**. 비즈니스 주체와 관련된 데이터, UI, 로직 | `ArtistCard`, `ConcertRow`, `UserAvatar`, `DB Access` | `Shared`만 사용 가능 (**다른 Feature/Entity 참조 주의**) |
| **Shared**   | 도메인에 종속되지 않는 재사용 가능한 코드                    | `Button`, `Modal`, `prisma`, `hooks`                  | 의존성 없음                                              |

---

## 3. 상세 리팩터링 계획

기존 `src/features`에 있는 코드 중 **도메인 모델 정의, 단순 조회 로직, 재사용 가능한 UI**를 `src/entities`로 이동합니다.

### A. 디렉토리 구조 변경안

```bash
src/
├── app/                    # [Layer] App: Composition Root
│                           # - 애플리케이터 설정, 라우팅, 전역 스타일 (layout, page, providers)
│
├── features/               # [Layer] Features: User Scenarios (사용자 유즈케이스)
│   ├── [slice]/            #   [Slice] (예: auth, ticketing, search)
│   │   ├── ui/             #     [Segment] Smart UI Components
│   │   │                   #     - 사용자 상호작용, 이벤트 핸들링, 폼 제출
│   │   │                   #     - 예: LoginForm, BookingWizard, SearchBar
│   │   │
│   │   ├── model/          #     [Segment] Business Logic & State
│   │   │                   #     - 기능 전용 상태(Store), 훅(Hooks), 유효성 검증(Schema)
│   │   │                   #     - 예: useLogin, ticketBookingStore, searchFormSchema
│   │   │
│   │   ├── api/            #     [Segment] External Interaction (Server Actions)
│   │   │                   #     - Server Actions: 클라이언트 요청 진입점 및 실행
│   │   │                   #     - DB/API 호출 오케스트레이션 (Model의 로직 사용)
│   │   │
│   │   ├── lib/            #     [Segment] Helpers (해당 기능 전용 유틸리티)
│   │   └── index.ts        #     [Public API] 외부에서 접근 가능한 모듈만 export
│
├── entities/               # [Layer] Entities: Business Domain (비즈니스 실체)
│   ├── [slice]/            #   [Slice] (예: artist, concert, user)
│   │   ├── ui/             #     [Segment] Dumb/Presentational UI
│   │   │                   #     - 데이터 표시 전용, 비즈니스 로직 없음 (Props Only)
│   │   │                   #     - 예: ArtistCard, ConcertBadge, UserAvatar
│   │   │
│   │   ├── model/          #     [Segment] Core Domain Models
│   │   │                   #     - 핵심 타입 정의(Types), 전역 도메인 상태
│   │   │                   #     - 예: type Artist, useUserSession
│   │   │
│   │   └── api/            #     [Segment] Data Source (DB/API)
│   │   │                   #     - DB 직접 접근(Prisma), 단순 CRUD, 캐싱(`use cache`)
│   │   │                   #     - 예: findArtistById, getConcertList
│   │   └── index.ts        #     [Public API] 외부에서 접근 가능한 모듈만 export
│
├── shared/                 # [Layer] Shared: Reusable Infrastructure (공용 인프라)
│   ├── ui/                 #   [Slice] UI Kit (Button, Modal, Input - 도메인 무관)
│   ├── lib/                #   [Slice] Libraries (date-fns, axios wrapper)
│   └── ...
└── ...

```

### B. 세그먼트(Segment)별 역할 상세 가이드

각 폴더(Segment)에 어떤 코드가 포함되어야 하는지 FSD 원칙에 따라 엄격히 정의합니다.

#### 1. `ui` (User Interface)

- **Entities (`entities/*/ui`)**:
  - **역할**: 도메인 데이터를 시각적으로 표현하는 **Presentation Component**.
  - **특징**: 비즈니스 로직, 상태 관리, API 호출을 포함하지 않습니다. Props로 데이터를 받아 그리기만 하는 "Dumb Component"입니다.
  - **예시**: `ArtistCard`, `ConcertStatusBadge`, `TicketRow`
- **Features (`features/*/ui`)**:
  - **역할**: 사용자와 상호작용하며 기능을 수행하는 **Container/Smart Component**.
  - **특징**: 이벤트 핸들러, 폼 제출, 상태 변경 로직을 포함합니다. Entities의 UI를 조립하고 데이터를 주입합니다.
  - **예시**: `LoginForm`, `SearchFilterBar`, `BookingWizard`

#### 2. `model` (Business Logic & Domain Model)

- **FSD 원칙**: 순수 비즈니스 로직과 도메인 규칙은 반드시 여기에 위치합니다.
- **Entities (`entities/*/model`)**:
  - **역할**: 도메인의 **핵심 데이터 구조(Type)**와 **상태(Store)** 정의.
  - **예시**: `interface Artist`, `type ConcertCategory`, `useUserStore`
- **Features (`features/*/model`)**:
  - **역할**: 기능 수행을 위한 **비즈니스 규칙**, **상태**, **유효성 검증**.
  - **내용**:
    - **Rules (순수 함수)**: `canRefund(ticket)`, `isBookingAvailable(concert)`
    - **Schema (Validation)**: `loginSchema`, `bookingFormSchema` (Zod)
    - **Hooks/Store**: `useLogin`, `bookingStore`

#### 3. `api` (External Communication & Execution)

- **FSD 원칙**: 외부 세계(DB, API, Client)와의 통신 및 실행을 담당합니다. `model`의 규칙을 사용하여 실제 작업을 수행합니다.
- **Entities (`entities/*/api`)**:
  - **역할**: **Data Access Object (DAO)**. Prisma 등 DB 접근 코드.
  - **내용**: `db.ts` (Prisma CRUD), `repository.ts`. 순수 데이터 조회 및 변경.
- **Features (`features/*/api`)**:
  - **역할**: **Orchestration (Controller)**. Server Actions 진입점.
  - **내용**: `actions.ts`. 클라이언트 요청을 받아 **Model의 규칙을 검증**하고 **Entity의 API를 호출**하여 기능을 완성합니다.

#### 4. `lib` (Library)

- **공통**: 해당 Slice 내에서만 쓰이는 유틸리티 함수(데이터 포맷팅, 계산 로직 등)를 위치시킵니다.

#### 5. `index.ts` (Public API)

- **역할**: Slice 내부의 기능을 외부로 노출하는 **공식 진입점(Entry Point)**.
- **규칙**:
  - 외부(다른 Slice, App Layer)에서는 반드시 **`index.ts`를 통해서만 import** 해야 합니다.
  - Slice 내부의 `ui`, `model` 등으로 직접 들어가는 Deep Import는 금지됩니다. (캡슐화 보장)
  - 예: `import { LoginForm } from '@/features/auth'` (O), `import { LoginForm } from '@/features/auth/ui/LoginForm'` (X)

### D. 주요 이동 대상 (예시)

1.  **Artists**
    - `features/artists/components/ArtistCard.tsx` -> `entities/artist/ui/ArtistCard.tsx`
    - `features/artists/server/db.ts` -> `entities/artist/api/db.ts` (단순 CRUD)
    - _Note: 아티스트 검색 기능(`ArtistSearch`)은 유즈케이스이므로 `features/search` 또는 `features/artist-search`에 유지._

2.  **Concerts**
    - `features/concerts/components/ConcertCard.tsx` -> `entities/concert/ui/ConcertCard.tsx`
    - `features/concerts/types.ts` -> `entities/concert/model/types.ts`

### D. Api Layer Roles (Server Actions & DB)

Next.js Server Actions 및 DB 로직(API)의 역할 분담:

- **Entities/Api**: **Data Access (Repository)**.
  - 순수하게 데이터베이스나 외부 API에서 데이터를 가져오는 역할.
  - 예: `findArtistById`, `saveConcert`
- **Features/Api**: **Orchestration (Controller)**.
  - 클라이언트 요청을 받아 **Model의 규칙(Rule)**을 통과하는지 검사 후, **Entities/Api**를 호출해 데이터를 저장/조회.
  - 예: `bookConcertAction` ( -> `checkBookingAvailability(model)` -> `saveReservation(entity/api)` )

---

## 4. 의존성 규칙 가이드 (ESLint 권장)

1.  **Entities는 절대 Features를 import 할 수 없다.**
    - ❌ `import { LoginModal } from '@/features/auth'` (in Entity)

#### 2. **Entities 간의 참조는 엄격히 금지된다.**

    - FSD 원칙에 따라 **같은 레이어의 Slice 간 Import는 금지**됩니다.
    - 예: `entities/concert`에서 `entities/artist`를 import 할 수 없습니다.
    - 해결책: 두 Entity가 모두 필요한 경우, 상위 레이어인 **Features**에서 조합하여 데이터를 주입해야 합니다.

#### 3. **Features는 다른 Features를 import 할 수 없다.** (기존 규칙 유지)

    - 서로 다른 Feature를 조합해야 한다면 `App`(Page)이나 `Widgets` 레이어에서 조합합니다.

## 5. 기대 효과

- **순환 참조 제거**: `Concert` 기능에서 `Artist` 카드를 쓸 때, `features/concerts` -> `entities/artist` 단방향 의존만 발생하므로 안전함.
- **높은 재사용성**: `ArtistCard`와 같은 컴포넌트는 검색 페이지, 마이페이지, 공연 상세 페이지 등 어디서든 부담 없이 가져다 쓸 수 있음.
- **명확한 관심사 분리**: "이 코드가 도메인 정의인가?(Entity)" vs "사용자 행동인가?(Feature)" 구분 명확화.

---

## 6. 적용 로드맵

1.  **`src/entities` 폴더 생성**
2.  **Shared/Base Models 이동**: `types` 폴더의 도메인 타입들을 각 Entity `model`로 이동.
3.  **UI Components 이동**: `ArtistCard`, `ConcertRow` 등 재사용성이 높은 UI 이동.
4.  **DB Logic 이동**: 각 Feature의 `db.ts` 중 순수 조회성 코드를 Entity로 이동.
5.  **Refactoring**: 의존성 경로 수정 (`@/features/...` -> `@/entities/...`).
