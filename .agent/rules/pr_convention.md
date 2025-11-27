---
trigger: always_on
---

# PR 컨벤션 (Pull Request Convention)

## PR 생성 규칙

- **대상 브랜치**: `develop`
- **명령어**: `gh pr create --base develop`

## PR 제목 형식

`[Type] 설명` (예: `✨ Feat : 핵심 라이브러리 추가`)

## PR 본문 템플릿

```markdown
Closes #이슈번호

## Changes

변경 사항 상세 목록 (파일, 로직, 설정 등)

## Architecture

Vertical Slice Architecture 적용 내용

## Verification

테스트 방법 및 결과

## Screenshots

(해당 시)
```
