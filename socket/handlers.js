import logger from '../utils/logger.js';
import { emitSocketError } from '../utils/socketError.js';
import { validateClient } from '../utils/validateClient.js';

export function socketHandler(io, socket) {
    const { companyCode, storeCode } = socket.handshake.query;

    const { valid, reason } = validateClient({ companyCode, storeCode });
    if (!valid) {
        logger.warn(`잘못된 접속 시도: ${reason} (${socket.id})`);
        emitSocketError(socket, 'INVALID_CLIENT', reason);
        socket.disconnect(true);
        return;
    }

    const roomName = `${companyCode}/${storeCode}`;
    socket.join(roomName);
    logger.info(`방 입장 완료: ${roomName}`);
    io.to(roomName).emit('system', `방 입장: ${roomName}`);

    socket.on('event', (payload) => {
        const { eventName, data } = payload;

        try {
            const jsonData = JSON.stringify(data);
            logger.info(`이벤트 수신: ${eventName}, (${jsonData})`);
            io.to(roomName).emit(eventName, data);
        } catch (error) {
            logger.error(`이벤트 수신 실패: ${eventName} - ${error.message}, (${data})`);
            socket.emit('error', {
                message: `이벤트 수신 실패: ${eventName} - ${error.message}`,
                payload: payload,
            });
        }
    });

    socket.on('disconnect', () => {
        logger.info(`연결 종료: ${roomName} (${socket.id})`);
        io.to(roomName).emit('system', `연결 종료: ${roomName}`);
    });
}