import express, { Request, Response } from 'express';
import healthRouter from './health';
import loginRouter from './login';
import cidrToMask from './cidrToMask';
import maskToCidr from './maskToCidr';

const apiRouter = express.Router();

apiRouter.get('/', (_req: Request, res: Response) => {
	res.send({ status: 'OK' });
});
apiRouter.use('/_health', healthRouter);
apiRouter.use('/login', loginRouter);
apiRouter.use('/cidrToMask', cidrToMask);
apiRouter.use('/maskToCidr', maskToCidr);

export default apiRouter;
