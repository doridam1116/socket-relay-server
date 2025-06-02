import winston from 'winston';

const isDev = process.env.NODE_ENV === 'development';

const logger = winston.createLogger({
    level: isDev ? 'debug' : 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        // 운영환경에서만 로그파일 저장
        ...(isDev ? [] : [new winston.transports.File({ filename: 'logs/server.log' })])
    ]
});

export default logger;