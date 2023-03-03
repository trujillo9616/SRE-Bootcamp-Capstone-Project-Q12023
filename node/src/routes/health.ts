import express, { Request, Response } from 'express';

const healthRouter = express.Router();

healthRouter.get('/', (_req: Request, res: Response) => {
	return res.send({ status: 'OK' });
});

export default healthRouter;
