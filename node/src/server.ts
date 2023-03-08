import express from 'express';
import morgan from 'morgan';
import hpp from 'hpp';
import helmet from 'helmet';

import swaggerDocs from './swagger';
import apiRouter from './routes';
import config from './config';
import middleware from './utils/middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '1kb' }));
app.use(express.json({ limit: '1kb' }));

app.use(hpp());
app.use(helmet());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.use('/api', apiRouter);
swaggerDocs(app, config.port);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
