---
trigger: always_on
---

Next.js 프로젝트 작업 규칙:

- 작업 시작 시 next-devtools-mcp의 init 도구를 먼저 호출하여 MCP 컨텍스트 설정
- Next.js 관련 질문은 nextjs_docs로 공식 문서 우선 검색
- 에러 진단은 nextjs_runtime의 get_errors 사용
- 브라우저 테스트는 browser_eval 활용
- Next.js 16 업그레이드나 Cache Components 설정 시 전용 도구 활용
