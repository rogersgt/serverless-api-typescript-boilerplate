/* eslint-disable no-shadow */
/* TO DO: Get Express Router to work here */

import { Request, Response } from 'express'; // eslint-disable-line no-unused-vars
import logger from '../logger';
import routes from './routes';

/**
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
export default async function router(req, res) {
  const {
    url,
    method,
    query,
    params,
  } = req;
  logger.debug({
    url,
    query,
    params,
  });

  if (method === 'HEAD') {
    return res.sendStatus(204);
  }

  const urlPartArray = url
    .split('?')
    .filter(str => !!str); // filter out undefined

  const baseUrl = urlPartArray[0];
  const route = routes
    .find((route) => baseUrl === route.url && route.method === method);

  logger.debug({ route });
  const payload = method.toLowerCase() === 'get' ? query : req.body;

  if (route) {
    return Promise.resolve()
      .then(() => route.handler(payload))
      .then((resp) => res.send(resp))
      .catch((e) => {
        logger.error(e);
        return res.sendStatus(500);
      });
  }

  return res.sendStatus(404);
};
