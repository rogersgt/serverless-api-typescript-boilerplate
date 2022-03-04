/* eslint-disable new-cap */
import { Router, Response } from 'express';
import * as userCtrl from '../controllers/userController';
import logger from '../logger';

const router = Router();

function handle500(error: Error, res: Response) {
  logger.error(error);
  return res.status(500).send(error.message || 'An Internal Error Occurred');
}

router.get('/user', (req, res) => {
  return userCtrl.getUsers(req.body)
    .then((data) => res.send(data))
    .catch((e) => handle500(e, res));
});

router.post('/user', (req, res) => {
  return userCtrl.addUser(req.body)
    .then((saveResp) => res.send(saveResp))
    .catch((e) => handle500(e, res));
});

export default router;
