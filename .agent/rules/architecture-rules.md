---
trigger: always_on
---

- 이 프로젝트는 **Vertical Slice Architecture (Feature-Sliced Design)**를 따릅니다.
- 상세 구조와 원칙은 반드시 `docs/project-structure.md`를 참조하고 준수하세요.
- 새로운 기능을 추가할 때는 `src/features/`에 위치시켜야 합니다.
- 공통으로 사용되는 UI나 로직만 `src/shared/`에 위치시킵니다.
