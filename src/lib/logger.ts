import winston from 'winston';
import 'winston-daily-rotate-file';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.splat(),
    winston.format.printf((info) => {
      const { level, timestamp, message } = info;
      return `${level} ${timestamp} : ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

if (
  process.env.NODE_ENV === 'production' &&
  process.env.LOG_FILE_PERSISTENCE === '1'
) {
  logger.transports.push(
    new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
    }),
  );
}
