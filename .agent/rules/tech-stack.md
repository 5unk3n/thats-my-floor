---
trigger: always_on
---

# 기술 스택 (Tech Stack)

기술 스택은 `docs/project-structure.md`의 '## 기술 스택'를 참조하세요.

## 사용 규칙

### UI 컴포넌트

1. **Shadcn/ui 우선 사용**
   - 모든 UI 컴포넌트는 Shadcn/ui를 먼저 확인하고 사용합니다.
   - 설치 명령어: `npx shadcn@latest add [component-name]`

2. **직접 구현이 필요한 경우**
   - Shadcn/ui에 해당 컴포넌트가 없는 경우에만 직접 구현합니다.
   - 직접 구현 시에도 Shadcn/ui의 디자인 시스템을 따릅니다.

3. **접근성(Accessibility)**
   - 모든 컴포넌트는 ARIA 속성을 적절히 사용해야 합니다.
   - Shadcn/ui는 접근성이 기본 제공되므로 우선 사용합니다.

### Server/Client Components

1. **기본은 Server Components**
   - 가능한 한 Server Components를 사용합니다.
   - 'use client'는 필요한 경우에만 사용합니다.

2. **Client Components 사용 시점**
   - 이벤트 핸들러 (onClick, onChange 등)
   - 브라우저 API 사용 (localStorage, window 등)
   - React Hooks 사용 (useState, useEffect 등)
   - 상태 관리 (Zustand, Context 등)

### 데이터 페칭

1. **Server Components**: 직접 데이터 페칭 또는 Server Actions 사용
2. **Client Components**: React Query 사용
3. **Form 처리**: Server Actions 우선 사용

### 스타일링

1. **Tailwind CSS 유틸리티 클래스 사용**
2. **cn() 유틸리티 함수 사용** (Shadcn/ui 제공)
3. **일관된 디자인 토큰 사용** (colors, spacing, typography)