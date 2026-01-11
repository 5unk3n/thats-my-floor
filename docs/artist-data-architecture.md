# 아티스트 데이터 아키텍처 (Artist Data Architecture)

## 1. 아키텍처 개요 (Overview)

본 문서는 서비스의 핵심 자산인 아티스트 데이터의 구조와 관리 전략을 기술합니다.
초기 구축은 **MusicBrainz Full Dump**를 사용하지만, 이후 유지보수는 **Replication Packet (Live Feed)**을 이용한 **증분 업데이트(Incremental Update)** 방식을 따릅니다.
여전히 **MusicBrainz의 Raw Layer**와 **서비스의 Domain Layer**를 분리한 **2-Layer 아키텍처**를 유지합니다.

---

## 2. 핵심 원칙 (Core Principles)

### 2.1. 2-Layer Data Strategy (데이터 계층 분리)

1. **Raw Layer (`mb_*`)**:
   - MusicBrainz 원본 데이터를 저장하는 **Mirror**입니다.
   - **Replication**을 통해 MusicBrainz 메인 서버와 동기화 상태를 유지합니다.

2. **Domain Layer (`artist`, `artist_custom_alias`)**:
   - 서비스 로직에 필요한 데이터만 `mb_artist`에서 Extract하여 사용합니다.
   - `gid` (UUID)를 통해 Raw Layer와 느슨하게 연결됩니다.

### 2.2. UUID (GID) Centric

- MusicBrainz의 **GID (UUID)**를 시스템의 유일한 식별자로 사용합니다.
- 모든 관계(Relation)는 이 GID를 기준으로 맺습니다.

### 2.3. Incremental Replication (증분 업데이트)

- 불필요한 전체 데이터 다운로드를 방지하고 최신성을 보장하기 위해 **변경분만 적용**합니다.
- MusicBrainz의 **Replication Packet (Hourly)**을 주기적으로 수신하여 반영합니다.

---

## 3. 데이터베이스 스키마 (Database Schema)

### 3.1. Raw Layer (MusicBrainz Mirror)

MusicBrainz의 원본 데이터를 저장하며, 다음 테이블들을 대상으로 복제를 수행합니다.

| 테이블명                | 역할 및 특징                                                                 |
| :---------------------- | :--------------------------------------------------------------------------- |
| **mb_artist**           | 아티스트 핵심 정보 (이름, 시작/종료일, GID 등). 검색을 위한 GIN 인덱스 적용. |
| **mb_artist_alias**     | 아티스트의 다국어 별칭 및 이명. `mb_artist`와 1:N 관계.                      |
| **mb_url**              | 외부 사이트 URL (Spotify, Instagram, Twitter 등).                            |
| **mb_l_artist_url**     | 아티스트와 URL 간의 N:N 연결 테이블. (`link` 테이블 참조)                    |
| **mb_link**             | 구체적인 링크 인스턴스 정보.                                                 |
| **mb_link_type**        | 링크의 종류 정의 (예: "streaming", "social network" 등).                     |
| **replication_control** | 복제 상태(Sequence) 관리용 로컬 테이블.                                      |

_참고: 전체 컬럼 정의는 `scripts/musicbrainz/schemas.ts` 또는 공식 문서를 참조하십시오._

### 3.2. Domain Layer (Persistent Data)

(기존과 동일)

```sql
CREATE TABLE artist (
    id SERIAL PRIMARY KEY,
    gid UUID NOT NULL UNIQUE,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE artist_custom_alias (
    id SERIAL PRIMARY KEY,
    artist_gid UUID NOT NULL,
    alias VARCHAR(255) NOT NULL,
    verified BOOLEAN DEFAULT FALSE
);
```

---

## 4. 데이터 업데이트 워크플로우 (Replication Workflow)

### Phase 1: Initial Import (최초 구축)

1. MusicBrainz 최신 Full Dump (`mbdump.tar.bz2`) 다운로드.
2. `artist`, `artist_alias` 등 타겟 테이블 Bulk Insert (COPY).
3. `replication_control` 테이블에 해당 Dump 시점의 Sequence 기록.

### Phase 2: Incremental Sync (정기 업데이트)

1. **Check**: MusicBrainz 서버의 최신 Replication Sequence 확인.
2. **Download**: 로컬 Sequence부터 최신 Sequence까지의 변경 패킷(`replication-*.tar.bz2`) 다운로드.
3. **Parse & Apply**:
   - 패킷 내 `dbmirror_pending` (Operation) 및 `dbmirror_pending_data` (Values) 파싱.
   - Tuple Format (`"key"='value'`) 정규식 파싱 처리.
   - 테이블명 정규화 (`"musicbrainz"."artist"` -> `artist`).
   - 1:1 순차 트랜잭션 적용 (`INSERT`, `UPDATE`, `DELETE`).

---

## 5. 구현 상세 (Implementation)

### 5.1. Tech Stack

- **Runtime**: Node.js (TypeScript)
- **Libraries**:
  - `tar-stream`: 패킷 아카이브 스트리밍.
  - `unbzip2-stream`: bzip2 압축 해제.
  - `pg`: PostgreSQL 데이터베이스 연동.

### 5.2. Data Processing Strategy

1. **Tuple Parsing**:
   - `dbmirror`는 데이터를 Tab-separated가 아닌 Postgres Tuple String (`"col1"='val1' "col2"='val2'`) 형태로 전달합니다.
   - 이를 정규식(`/"([^"]+)"='((?:[^']|'')*)'/g`)으로 파싱하여 Key-Value 객체로 변환합니다.

2. **Schema Normalization**:
   - 패킷의 테이블명에 포함된 스키마 접두사(예: `"musicbrainz".`)를 제거하여 로컬 테이블명과 매핑합니다.

### 5.3. 폴더 구조

```text
scripts/musicbrainz/
├── import.sh                # [Bash] 최초 Full Dump 로드 및 테이블 생성
├── replicate.ts             # [Node.js] 리플리케이션 실행 엔트리포인트
└── replicator/              # [Module] 리플리케이터 핵심 로직
    ├── database.ts          # DB 연결 및 트랜잭션/쿼리 실행
    ├── downloader.ts        # MusicBrainz API 패킷 다운로드 (Rate Limit)
    ├── parser.ts            # .tar.bz2 파싱 및 Tuple 데이터 변환
    ├── schemas.ts           # 테이블 컬럼 정의 (Headerless TSV 매핑용)
    └── types.ts             # 공통 타입 정의
```

---

## 6. 검색 로직 (Search Logic)

### 6.1. 검색 인프라 (Search Infrastructure)

- **Materialized View (`mv_artist_search`) 활용**:
  - `mb_artist` (이름)와 `mb_artist_alias` (별칭)를 `union`하여 하나의 검색 뷰로 통합 관리합니다.
  - **1 Name = 1 Row** 원칙: 각 이름(이명 포함)이 하나의 행이 되어 검색 효율을 극대화합니다.
  - 정규화된 검색 컬럼(`search_name_normalized`)을 미리 계산하여 저장합니다 (`lower` + `unaccent`).
  - `pg_trgm` GIN Index를 적용하여 퍼지 검색 성능을 보장합니다.

### 6.2. 매칭 및 랭킹 알고리즘 (Matching & Ranking Strategy)

사용자의 검색 의도를 정확히 파악하기 위해 다단계 랭킹 시스템을 적용합니다.

1.  **Normalization**: 입력된 쿼리와 DB 데이터 모두 소문자화 및 악센트 제거(`unaccent`)를 수행합니다.
2.  **Fuzzy Matching**: `pg_trgm`의 `similarity` 함수를 사용하여 오타가 포함된 검색어도 찾아냅니다.
3.  **Ranking Priority (우선순위 정렬)**:
    1. **Prefix Rank**: 검색어가 이름의 **접두사(Prefix)**로 시작하는 경우 최상위 노출 (가장 강력한 의도).
    2. **Name Length**: 이름이 짧을수록 우선 노출 (정확도 높은 간결한 결과 선호).
    3. **Similarity Score**: 유사도 점수가 높은 순.
    4. **Meta Priority**: 본명(`canonical_name`)이거나, 주요 별칭(`is_primary`)인 경우 가산점.
