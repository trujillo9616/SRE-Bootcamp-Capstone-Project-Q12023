import express from 'express';
import morgan from 'morgan';

import { healthRouter, loginRouter } from './routes';
import middleware from './utils/middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.use('/api/_health', healthRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
