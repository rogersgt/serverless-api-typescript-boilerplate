import { createLogger, format, transports } from 'winston';
const {
  LOG_LEVEL,
  AWS_EXECUTION_ENV,
} = process.env;

const isLocal = !AWS_EXECUTION_ENV;

const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
  level: LOG_LEVEL,
  format: isLocal ? combine(
    label({ label: APP_NAME }),
    timestamp(),
    prettyPrint(),
  ) : combine(
    label({ label: APP_NAME }),
    timestamp(),
  ),
  transports: [new transports.Console()],
});

export default logger;
