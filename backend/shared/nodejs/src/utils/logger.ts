/**
 * Structured logging utilities
 */

import winston from 'winston';

const environment = process.env.ENVIRONMENT || 'dev';

const logger = winston.createLogger({
  level: environment === 'prod' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'project-buddie', environment },
  transports: [new winston.transports.Console()],
});

export default logger;
