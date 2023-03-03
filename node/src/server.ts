import express from 'express';
import morgan from 'morgan';
import { healthRouter } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.use('/api/_health', healthRouter);

export default app;
