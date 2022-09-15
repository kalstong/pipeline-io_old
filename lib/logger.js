const isObject = require('lodash/isObject')
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const fs = require('fs');
var path = require('path');
global.appRoot = path.resolve(process.cwd(), 'logs');

// Error.stackTraceLimit = 2

if (!fs.existsSync(appRoot)) fs.mkdirSync(appRoot);
const filename = path.join(appRoot, 'pipeline-io_%DATE%.log');

const formatOutput = info => {
    const { timestamp, label, level, message, extra } = info;
    
    if (extra && extra instanceof Error )
        return `${timestamp} [${label}] ${level}: ${message}\n${extra}`;
    
    if (extra && isObject(extra))
        return `${timestamp} [${label}] ${level}: ${message}\n${JSON.stringify(extra)}`;

    if (extra)
        return `${timestamp} [${label}] ${level}: ${message}\n${extra}`;

    return `${timestamp} [${label}] ${level}: ${message}`;
};

const logger = createLogger({
    level: 'info',

    transports: [
        new transports.Console({
            format: format.combine(
                format.errors({ stack: true}),
                format.colorize(),
                format.timestamp(),
                format.printf(formatOutput)
            )
        }),
        new transports.DailyRotateFile({
            format: format.combine(
                format.errors({stack: true}),
                format.uncolorize(),
                format.timestamp(),
                format.printf(formatOutput)
            ),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            filename
          }),
    ],
});

module.exports = label => ({
    error: (msg, extra) => logger.log({ label: label, level: 'error', message: msg, extra }),
    warn: (msg, extra) => logger.log({ label: label, level: 'warn', message: msg, extra }),
    info: (msg, extra) => logger.log({ label: label, level: 'info', message: msg, extra }),
    verb: (msg, extra) => logger.log({ label: label, level: 'verbose', message: msg, extra }),
    debug: (msg, extra) => logger.log({ label: label, level: 'debug', message: msg, extra }),
});