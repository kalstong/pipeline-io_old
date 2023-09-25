import fs from 'fs';
import path from 'path';
import { createLogger, transports, format } from "winston";
import 'winston-daily-rotate-file';

const logDir = 'logs';
if(!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const simpleLoggingFormat = format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.splat(),
    format.printf((info) => {
      const { timestamp, level, message, ...meta } = info;
      
      return `${timestamp} [${level}]: ${message} ${Object.keys(meta.metadata).length ? JSON.stringify(meta.metadata, null, 2) : ''}`;
    }));

export const logger = createLogger({
    transports: [
      new transports.Console({
        format: process.env.LOG_FORMAT === 'json' ? format.json() : simpleLoggingFormat,
      }),
      new transports.DailyRotateFile({
        format: format.combine(
            format.errors({stack: true}),
            format.uncolorize(),
            format.timestamp(),
            format.printf((info) => {
                const { timestamp, level, message, ...meta } = info;
            
                return `${timestamp} [${level}]: ${message} ${Object.keys(meta.metadata).length ? JSON.stringify(meta.metadata, null, 2) : ''}`;
            })),
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '7d',
        filename: path.join(logDir, 'pipeline-io-%DATE%.log'),
      }),
    ],
    format: format.combine(format.metadata(), format.timestamp()),
    exitOnError: false
  });