# Sale Mate Relay

**Sale Mate Relay**는 POS, KDS, DID 간 실시간 통신을 중계하는 WebSocket 기반의 서버입니다.  
Node.js + Express + Socket.IO 기반으로 구축되었으며, 다양한 기기 간 실시간 메시지 전달을 지원합니다.

---

## 🛠 개발 환경 및 버전 정보

- **Node.js**: `v16.20.2` (개발서버 제한으로 인해 최신 버전이 아닌 이 버전을 사용)
- **OS**: Windows / macOS / Linux 모두 지원
- **실행 환경**: `.env.development` 또는 `.env.production` 환경 설정 필요

---

## 🚀 주요 기능

- 실시간 양방향 통신 지원 (Socket.IO 기반)  
- HTTP API 제공 (헬스 체크, 버전 확인)  
- ESM 기반 구조  
- 환경별 설정 파일 (.env)  
- winston 기반 로깅 지원  
- 에러 핸들링 미들웨어 포함

---

## 📁 프로젝트 구조

```
sale-mate-relay/
├── routes/
│   └── api.js              # 헬스 체크 및 버전 확인 API
│
├── socket/
│   └── handlers.js         # 소켓 이벤트 핸들러
│
├── utils/
│   ├── logger.js           # winston 로깅 설정
│   ├── socketError.js      # 소켓 오류 응답 유틸
│   └── validateClient.js   # 클라이언트 유효성 검증
│
├── middlewares/
│   └── errorHandler.js     # 공통 에러 처리 미들웨어
│
├── .env.development        # 개발 환경 변수
├── .env.production         # 운영 환경 변수
├── package.json
└── index.js                # 메인 서버 진입점
```

---

## ⚙️ 환경 변수 설정

루트에 아래 2개의 `.env` 파일을 생성하고 환경에 따라 사용하세요.

### `.env.development`

```
PORT=8200
NODE_ENV=development
CORS_ORIGIN=http://localhost:8090
```

### `.env.production`

```
PORT=8200
NODE_ENV=production
CORS_ORIGIN=https://your-production-domain.com
```

---

## 🧪 실행 방법

### 1. 의존성 설치

```
npm install
```

### 2. 개발 모드 실행

```
npm run dev
```

### 3. 운영 모드 실행

```
npm run start
```

---

## 🌐 API 확인

| 경로           | 설명                     |
|----------------|--------------------------|
| `/api/health`  | 서버 헬스 체크 (`OK`)    |
| `/api/version` | 버전 정보 반환 (`1.0.0`) |

---

## 📝 로그 확인

- `logs/app.log`: 일반 로그  
- `logs/error.log`: 에러 로그  

---

## 📦 배포 참고

운영 환경에서는 `pm2`를 사용해 서버를 백그라운드에서 실행하는 것을 권장합니다:

### 프로젝트 디렉토리로 이동

```
cd sale-mate-relay
```

> **주의:** 위의 경로는 예시입니다. 실제로 사용하는 프로젝트 경로는 다를 수 있으므로, 자신의 프로젝트가 위치한 디렉토리로 이동해야 합니다. 프로젝트 경로를 정확히 확인한 후 해당 경로로 이동하세요.

### 기존 프로세스 종료

```
pm2 stop sale-mate-relay
```

### 최신 코드 가져오기

```
git pull
```

### 필요한 패키지 설치 (필요 시)

```
npm install
```

### 서비스 시작

```
pm2 start npm --name sale-mate-relay -- run start
```

### 실행 중인 상태 확인

```
pm2 status
```

### 로그 확인

```
pm2 logs sale-mate-relay
```

---
