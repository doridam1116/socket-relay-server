import logger from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
    logger.error(`오류 발생: ${err.message}`);
    res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
}