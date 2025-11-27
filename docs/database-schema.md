# 공연 알림 서비스 - 데이터베이스 스키마

## 문서 정보

- **문서명**: 데이터베이스 스키마 설계
- **프로젝트**: 공연 알림 서비스
- **DBMS**: PostgreSQL 14+
- **ORM**: Prisma

---

## ERD 개요

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Accounts  │◄────────┤    Users     │◄────────┤ UserArtists  │
└─────────────┘         └──────┬───────┘         └──────┬───────┘
                               │                        │
                               │                        │
                               │                 ┌──────▼───────┐
                               │                 │   Artists    │
                               │                 └──────┬───────┘
                               │                        │
                               │                 ┌──────▼───────┐
                               ▼                 │  Concerts    │
                        ┌──────────────┐         └──────┬───────┘
                        │UserDevices   │                │
                        └──────────────┘         ┌──────▼───────┐
                                                 │  Setlists    │
                                                 └──────────────┘
```

---

## 테이블 정의

### 1. users (사용자)

NextAuth.js 표준 스키마를 따릅니다.

```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  email_verified TIMESTAMP,
  image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 1-1. accounts (계정 - OAuth)

사용자의 소셜 로그인 계정 정보를 저장합니다. (1:N 관계)

```sql
CREATE TABLE accounts (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type VARCHAR(255),
  scope TEXT,
  id_token TEXT,
  session_state TEXT,

  UNIQUE(provider, provider_account_id)
);
```

### 1-2. sessions (세션)

데이터베이스 세션 관리를 위한 테이블입니다.

```sql
CREATE TABLE sessions (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token VARCHAR(255) UNIQUE NOT NULL,
  user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP NOT NULL
);
```

### 1-3. verification_tokens (인증 토큰)

이메일 로그인 등을 위한 검증 토큰입니다.

```sql
CREATE TABLE verification_tokens (
  identifier VARCHAR(255) NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires TIMESTAMP NOT NULL,

  UNIQUE(identifier, token)
);
```

---

### 2. artists (아티스트)

아티스트 정보를 저장합니다.

```sql
CREATE TABLE artists (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  image TEXT,
  genre VARCHAR(100),
  description TEXT,
  spotify_artist_id VARCHAR(100),
  follower_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_artists_name ON artists(name);
CREATE INDEX idx_artists_spotify ON artists(spotify_artist_id);
```

**컬럼 설명:**

- `id`: 아티스트 고유 ID
- `name`: 아티스트명
- `image`: 아티스트 이미지 URL
- `genre`: 장르
- `description`: 아티스트 소개
- `spotify_artist_id`: Spotify 아티스트 ID
- `follower_count`: 팔로워 수 (캐시)

---

### 3. concerts (공연)

공연 정보를 저장합니다.

```sql
CREATE TABLE concerts (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  kopis_id VARCHAR(100) UNIQUE, -- kOPIS API의 공연 ID (mt20id)
  title VARCHAR(255) NOT NULL,
  artist_id VARCHAR(36) REFERENCES artists(id) ON DELETE SET NULL,
  poster TEXT,
  date TIMESTAMP NOT NULL,
  venue_name VARCHAR(255) NOT NULL,
  venue_address TEXT,
  venue_map_link TEXT,
  region VARCHAR(50),
  genre VARCHAR(100),
  description TEXT,
  ticket_status VARCHAR(20), -- 'open', 'booking', 'closed'
  ticket_open_date TIMESTAMP,
  ticket_price_min INTEGER,
  ticket_price_max INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_concerts_artist ON concerts(artist_id);
CREATE INDEX idx_concerts_date ON concerts(date);
CREATE INDEX idx_concerts_region ON concerts(region);
CREATE INDEX idx_concerts_genre ON concerts(genre);
CREATE INDEX idx_concerts_ticket_status ON concerts(ticket_status);
CREATE INDEX idx_concerts_kopis ON concerts(kopis_id);
```

**컬럼 설명:**

- `kopis_id`: kOPIS API의 공연 고유 ID
- `title`: 공연명
- `artist_id`: 아티스트 ID (외래키)
- `poster`: 포스터 이미지 URL
- `date`: 공연 날짜 및 시간
- `venue_name`: 공연장명
- `venue_address`: 공연장 주소
- `region`: 지역 (서울, 부산 등)
- `genre`: 장르
- `ticket_status`: 티켓 상태
- `ticket_open_date`: 티켓 오픈 일시

---

### 4. booking_links (예매처 링크)

공연별 예매처 정보를 저장합니다.

```sql
CREATE TABLE booking_links (
  id SERIAL PRIMARY KEY,
  concert_id VARCHAR(36) REFERENCES concerts(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL, -- '인터파크', '멜론티켓', '예스24' 등
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_booking_links_concert ON booking_links(concert_id);
```

---

### 5. user_artists (사용자-아티스트 팔로우)

사용자가 팔로우한 아티스트를 저장합니다.

```sql
CREATE TABLE user_artists (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
  artist_id VARCHAR(36) REFERENCES artists(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(user_id, artist_id)
);

CREATE INDEX idx_user_artists_user ON user_artists(user_id);
CREATE INDEX idx_user_artists_artist ON user_artists(artist_id);
```

---

### 6. setlists (셋리스트)

공연별 셋리스트 정보를 저장합니다.

```sql
CREATE TABLE setlists (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  concert_id VARCHAR(36) REFERENCES concerts(id) ON DELETE CASCADE,
  artist_id VARCHAR(36) REFERENCES artists(id) ON DELETE SET NULL,
  date TIMESTAMP,
  venue VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_setlists_concert ON setlists(concert_id);
CREATE INDEX idx_setlists_artist ON setlists(artist_id);
```

---

### 7. setlist_tracks (셋리스트 트랙)

셋리스트의 개별 곡 정보를 저장합니다.

```sql
CREATE TABLE setlist_tracks (
  id SERIAL PRIMARY KEY,
  setlist_id VARCHAR(36) REFERENCES setlists(id) ON DELETE CASCADE,
  order_number INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  spotify_track_id VARCHAR(100),
  duration INTEGER, -- 밀리초
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_setlist_tracks_setlist ON setlist_tracks(setlist_id);
CREATE INDEX idx_setlist_tracks_order ON setlist_tracks(setlist_id, order_number);
```

---

### 8. notification_settings (알림 설정)

사용자별 알림 설정을 저장합니다.

```sql
CREATE TABLE notification_settings (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(36) UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  ticket_open_alert BOOLEAN DEFAULT TRUE,
  concert_registration_alert BOOLEAN DEFAULT TRUE,
  email_notification BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notification_settings_user ON notification_settings(user_id);
```

---

### 9. user_devices (사용자 디바이스)

푸시 알림을 위한 FCM 토큰을 저장합니다.

```sql
CREATE TABLE user_devices (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
  fcm_token TEXT UNIQUE NOT NULL,
  platform VARCHAR(20) NOT NULL, -- 'web', 'android', 'ios'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_devices_user ON user_devices(user_id);
CREATE INDEX idx_user_devices_token ON user_devices(fcm_token);
```

---

### 10. notifications (알림 이력)

발송된 알림 이력을 저장합니다.

```sql
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'ticket_open', 'concert_registration'
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  concert_id VARCHAR(36) REFERENCES concerts(id) ON DELETE SET NULL,
  read_at TIMESTAMP,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_sent_at ON notifications(sent_at);
```

---

## Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id            String    @id @default(uuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime? @map("email_verified")
  image         String?
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  accounts      Account[]
  sessions      Session[]

  // Custom Relations
  followedArtists         UserArtist[]
  notificationSettings    NotificationSettings?
  devices                 UserDevice[]
  notifications           Notification[]

  @@map("users")
}

model Account {
  id                String   @id @default(uuid())
  userId            String   @map("user_id")
  type              String
  provider          String
  providerAccountId String   @map("provider_account_id")
  refresh_token     String?  @db.Text
  access_token      String?  @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?  @db.Text
  session_state     String?
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(uuid())
  sessionToken String   @unique @map("session_token")
  userId       String   @map("user_id")
  expires      DateTime
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  createdAt  DateTime @default(now()) @map("created_at")

  @@unique([identifier, token])
  @@map("verification_tokens")
}

model Artist {
  id              String   @id @default(uuid())
  name            String
  image           String?
  genre           String?
  description     String?
  spotifyArtistId String?  @unique @map("spotify_artist_id")
  followerCount   Int      @default(0) @map("follower_count")
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")

  concerts  Concert[]
  followers UserArtist[]
  setlists  Setlist[]

  @@map("artists")
}

model Concert {
  id             String    @id @default(uuid())
  kopisId        String?   @unique @map("kopis_id")
  title          String
  artistId       String?   @map("artist_id")
  poster         String?
  date           DateTime
  venueName      String    @map("venue_name")
  venueAddress   String?   @map("venue_address")
  venueMapLink   String?   @map("venue_map_link")
  region         String?
  genre          String?
  description    String?
  ticketStatus   String?   @map("ticket_status")
  ticketOpenDate DateTime? @map("ticket_open_date")
  ticketPriceMin Int?      @map("ticket_price_min")
  ticketPriceMax Int?      @map("ticket_price_max")
  createdAt      DateTime  @default(now()) @map("created_at")
  updatedAt      DateTime  @updatedAt @map("updated_at")

  artist        Artist?        @relation(fields: [artistId], references: [id])
  bookingLinks  BookingLink[]
  setlists      Setlist[]
  notifications Notification[]

  @@index([date])
  @@index([artistId])
  @@index([region])
  @@map("concerts")
}

model BookingLink {
  id        Int      @id @default(autoincrement())
  concertId String   @map("concert_id")
  platform  String
  url       String
  createdAt DateTime @default(now()) @map("created_at")

  concert   Concert  @relation(fields: [concertId], references: [id], onDelete: Cascade)

  @@map("booking_links")
}

model UserArtist {
  id        Int      @id @default(autoincrement())
  userId    String   @map("user_id")
  artistId  String   @map("artist_id")
  createdAt DateTime @default(now()) @map("created_at")

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  artist    Artist   @relation(fields: [artistId], references: [id], onDelete: Cascade)

  @@unique([userId, artistId])
  @@map("user_artists")
}

model Setlist {
  id        String   @id @default(uuid())
  concertId String?  @map("concert_id")
  artistId  String?  @map("artist_id")
  date      DateTime?
  venue     String?
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  concert   Concert? @relation(fields: [concertId], references: [id], onDelete: Cascade)
  artist    Artist?  @relation(fields: [artistId], references: [id])
  tracks    SetlistTrack[]

  @@map("setlists")
}

model SetlistTrack {
  id             Int      @id @default(autoincrement())
  setlistId      String   @map("setlist_id")
  orderNumber    Int      @map("order_number")
  title          String
  spotifyTrackId String?  @map("spotify_track_id")
  duration       Int?
  createdAt      DateTime @default(now()) @map("created_at")

  setlist        Setlist  @relation(fields: [setlistId], references: [id], onDelete: Cascade)

  @@map("setlist_tracks")
}

model NotificationSettings {
  id                       Int      @id @default(autoincrement())
  userId                   String   @unique @map("user_id")
  ticketOpenAlert          Boolean  @default(true) @map("ticket_open_alert")
  concertRegistrationAlert Boolean  @default(true) @map("concert_registration_alert")
  emailNotification        Boolean  @default(false) @map("email_notification")
  createdAt                DateTime @default(now()) @map("created_at")
  updatedAt                DateTime @updatedAt @map("updated_at")

  user                     User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("notification_settings")
}

model UserDevice {
  id        Int      @id @default(autoincrement())
  userId    String   @map("user_id")
  fcmToken  String   @unique @map("fcm_token")
  platform  String
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("user_devices")
}

model Notification {
  id        Int      @id @default(autoincrement())
  userId    String   @map("user_id")
  type      String
  title     String
  body      String
  concertId String?  @map("concert_id")
  readAt    DateTime? @map("read_at")
  sentAt    DateTime @default(now()) @map("sent_at")
  createdAt DateTime @default(now()) @map("created_at")

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  concert   Concert? @relation(fields: [concertId], references: [id])

  @@map("notifications")
}
```

---

## 주요 쿼리 예시

### 1. 팔로우한 아티스트의 예정 공연 조회

```sql
SELECT c.*
FROM concerts c
JOIN user_artists ua ON c.artist_id = ua.artist_id
WHERE ua.user_id = $1
  AND c.date > NOW()
ORDER BY c.date ASC;
```

### 2. 오늘 티켓 오픈되는 공연 조회

```sql
SELECT c.*, a.name as artist_name
FROM concerts c
JOIN artists a ON c.artist_id = a.id
WHERE DATE(c.ticket_open_date) = CURRENT_DATE
  AND c.ticket_status = 'open';
```

### 3. 특정 아티스트를 팔로우한 사용자 조회

```sql
SELECT u.*, ns.ticket_open_alert, ns.concert_registration_alert
FROM users u
JOIN user_artists ua ON u.id = ua.user_id
LEFT JOIN notification_settings ns ON u.id = ns.user_id
WHERE ua.artist_id = $1
  AND (ns.ticket_open_alert = TRUE OR ns.concert_registration_alert = TRUE);
```

---

## 인덱스 전략

- **자주 조회되는 컬럼**: `email`, `kopis_id`, `artist_id`, `date`
- **조인 키**: 모든 외래키에 인덱스 생성
- **필터링 컬럼**: `region`, `genre`, `ticket_status`
- **복합 인덱스**: `(setlist_id, order_number)` - 셋리스트 트랙 정렬

---

## 데이터 마이그레이션 전략

1. **초기 데이터**: kOPIS API에서 공연 데이터 수집 (최근 6개월)
2. **주기적 동기화**: 매일 자정 신규 공연 데이터 수집
3. **아티스트 정규화**: 공연 등록 시 아티스트 이름으로 매칭, 없으면 신규 생성
4. **Spotify 연동**: 아티스트명으로 Spotify API 검색, `spotify_artist_id` 저장
