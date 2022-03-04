import serverless from 'serverless-http';
import express from 'express';
import {
  json,
  urlencoded,
} from 'body-parser';
import router from './router';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(router);

export const api = serverless(app);
