import bunyan from 'bunyan';

/* eslint-disable no-console */
const {
  APP_NAME,
  LOG_LEVEL = 'info',
} = process.env;

const logger = bunyan.createLogger({
  name: APP_NAME,
});

logger.level(LOG_LEVEL);

export default logger;
