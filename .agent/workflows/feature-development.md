---
description: 기능 개발 워크플로우 (Feature Development Workflow)
---

# 기능 개발 워크플로우 (Feature Development Workflow)

새로운 기능을 개발할 때는 다음 절차를 따릅니다.

1.  **이슈 확인 (Issue Check)**:
    - 작업 전 이슈의 세부 사항과 요구 사항을 명확히 확인합니다.

2.  **브랜치 생성 (Branch Creation)**:
    - `develop` 브랜치를 최신 상태로 업데이트한 후 분기합니다 (`git pull origin develop`).
    - 브랜치 이름 형식: `feat/이슈번호-설명` (예: `feat/16-core-libs`)

3.  **구현 및 반복 커밋 (Implementation & Iterative Commits)**:
    - **반복 주기 (Cycle)**: `작업 단위 구현` -> `검증` -> `커밋` 과정을 반복합니다.
    - **Vertical Slice Architecture**를 엄격히 준수합니다.
    - **Atomic Commits**: 각 컴포넌트, 함수, 또는 설정 변경 등 논리적인 최소 단위가 완성될 때마다 즉시 커밋합니다.
      - _잘못된 예_: "모든 리팩터링 완료" (한 번에 커밋)
      - _올바른 예_: "ConcertCard 컴포넌트 리팩터링", "ConcertFilter 컴포넌트 리팩터링" (각각 커밋)
    - **커밋 컨벤션**: **[.agent/rules/commit_convention.md]**를 준수합니다.

4.  **최종 검증 (Final Verification)**:
    - 작업 완료 전 다음 명령어를 실행하여 오류가 없는지 확인합니다.
      - `npm run lint`
      - `npm run build`
    - `docs/`의 문서들을 확인하고 불일치 하는 코드가 있는지 확인합니다.

5.  **PR 생성 (PR Creation)**:
    - **[.agent/rules/pr_convention.md]**를 참고하여 PR을 작성합니다.
    - 작성 후 바로 생성하지 않고 유저에게 확인을 받습니다.
