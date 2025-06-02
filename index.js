import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import http from 'http';
// import https from 'https';
import { Server } from 'socket.io';
import { errorHandler } from './middlewares/errorHandler.js';
import apiRoutes from './routes/api.js';
import { socketHandler } from './socket/handlers.js';
import logger from './utils/logger.js';

const envPath = `.env.${process.env.NODE_ENV ?? 'development'}`;
dotenv.config({ path: envPath});

const PORT = process.env.PORT || 8200;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:8090';

// SSL 인증서 로드
// const sslOptions = {
//     key: fs.readFileSync('./private.key'),
//     cert: fs.readFileSync('./certificate.crt')
// };

const app = express();

// API 라우터 등록
app.use('/api', apiRoutes);

// 에러 핸들러 등록
app.use(errorHandler);

// HTTPS 서버 생성
const server = http.createServer(app);
// const server = https.createServer(sslOptions, app);

// Socket.io 연결
const io = new Server(server, {
    cors: {
        origin: CORS_ORIGIN,
    }
});

// 소켓 연결 처리
io.on('connection', (socket) => {
    logger.info('클라이언트 연결됨: ', socket.id);
    socketHandler(io, socket);
})

// 서버 시작
server.listen(PORT, () => {
    logger.info(`서버 실행 중: http://localhost:${PORT}`);
});
