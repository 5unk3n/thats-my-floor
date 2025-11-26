# 커밋 컨벤션

## 기본 원칙

- **각 작업 단위마다 커밋**을 수행합니다.
- **Gitmoji 형식**을 사용합니다: `이모지 타입 : 설명`

---

## 커밋 타입

### ✨ Feat

새로운 기능 추가, 기존의 기능을 요구 사항에 맞추어 수정

**예시:**

```text
✨ Feat : 공연 목록 필터링 기능 추가
✨ Feat : 아티스트 팔로우 기능 구현
```

---

### 🐛 Fix

기능에 대한 버그 수정

**예시:**

```text
🐛 Fix : 로그인 후 리다이렉트 오류 수정
🐛 Fix : 공연 상세 페이지 이미지 로딩 실패 해결
```

---

### 👷 Build

빌드 관련 수정

**예시:**

```text
👷 Build : Next.js 빌드 설정 최적화
👷 Build : Docker 이미지 빌드 스크립트 수정
```

---

### 📦️ Chore

패키지 매니저 수정, 그 외 기타 수정 (ex. `.gitignore`)

**예시:**

```text
📦️ Chore : Prettier 설치
📦️ Chore : .gitignore에 환경변수 파일 추가
```

---

### 📝 Docs

문서(주석) 수정

**예시:**

```text
📝 Docs : README에 프로젝트 설명 추가
📝 Docs : API 명세서 업데이트
```

---

### 🎨 Style

코드 스타일, 포맷팅에 대한 수정

**예시:**

```text
🎨 Style : Prettier 설정 파일 추가
🎨 Style : ESLint 규칙 적용
```

---

### ♻️ Refactor

기능의 변화가 아닌 코드 리팩터링 (ex. 변수 이름 변경)

**예시:**

```text
♻️ Refactor : 공연 조회 로직 함수 분리
♻️ Refactor : 변수명 명확화 (data -> concerts)
```

---

### 🔖 Release

버전 릴리즈

**예시:**

```text
🔖 Release : v1.0.0
🔖 Release : v1.1.0 - 알림 기능 추가
```

---

### 🧪 Test

테스트 코드 관련

**예시:**

```text
🧪 Test : 공연 목록 조회 API 테스트 추가
🧪 Test : 로그인 플로우 E2E 테스트 작성
```

---

### 💄 Design

CSS 수정

**예시:**

```text
💄 Design : 공연 카드 레이아웃 수정
💄 Design : 반응형 디자인 개선
```

---

### 🚑️ Hotfix

급하게 치명적인 버그를 고치는 경우

**예시:**

```text
🚑️ Hotfix : 프로덕션 DB 연결 오류 긴급 수정
🚑️ Hotfix : 결제 API 장애 대응
```

---

### 🔨 Modify

정말 단순한 코드 수정 (ex. 오타, 문자열 변경 등)

**예시:**

```text
🔨 Modify : 오타 수정 (concret -> concert)
🔨 Modify : 버튼 텍스트 변경
```

---

### 🚚 Rename

파일 및 폴더 구조 변경

**예시:**

```text
🚚 Rename : components 폴더를 features로 이동
🚚 Rename : ConcertCard.tsx -> ConcertListItem.tsx
```

---

### ➖ Remove

파일 삭제

**예시:**

```text
➖ Remove : 사용하지 않는 legacy 컴포넌트 삭제
➖ Remove : 테스트용 더미 데이터 파일 제거
```

---

## 커밋 메시지 작성 팁

1. **제목은 50자 이내**로 간결하게 작성
2. **동사는 현재형**으로 작성 (추가했다 ❌ → 추가 ⭕)
3. **본문이 필요한 경우** 제목과 본문 사이 빈 줄 추가

**예시:**

```text
✨ Feat : 공연 검색 자동완성 기능 추가

- Debounce 300ms 적용
- 최대 10개 결과 표시
- 검색어 하이라이팅 구현
```
