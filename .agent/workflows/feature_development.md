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

3.  **구현 (Implementation)**:
    - **Vertical Slice Architecture**를 엄격히 준수합니다.
    - 린트(Linting) 및 포맷팅(Formatting) 규칙을 준수합니다.

4.  **커밋 (Commit)**:
    - **[.agent/rules/commit_convention.md]**를 준수합니다.
    - **Atomic Commits**: 변경 사항을 논리적인 최소 단위로 쪼개서 커밋합니다. 거대한 단일 커밋을 지양합니다.

5.  **검증 (Verification)**:
    - 작업 완료 전 다음 명령어를 실행하여 오류가 없는지 확인합니다.
      - `npm run lint`
      - `npm run build`

6.  **PR 생성 (PR Creation)**:
    - **[.agent/rules/pr_convention.md]**를 참고하여 PR을 작성합니다.