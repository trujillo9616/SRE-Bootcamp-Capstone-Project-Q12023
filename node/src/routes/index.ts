import express, { Request, Response } from 'express';
import healthRouter from './health';
import loginRouter from './login';
import cidrToMask from './cidrToMask';
import maskToCidr from './maskToCidr';

const apiRouter = express.Router();

/**
 * @swagger
 * /api:
 *  get:
 *   summary: Returns the API status
 *   description: Returns the API status, the preffered way to check if the API is up and running is to use the /api/_health endpoint
 *   responses:
 *     200:
 *       description: API status
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     500:
 *       description: Internal server error
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *             error:
 *               type: string
 *             message:
 *              type: string
 */
apiRouter.get('/', (_req: Request, res: Response) => {
	res.send({ status: 'OK' });
});
apiRouter.use('/_health', healthRouter);
apiRouter.use('/login', loginRouter);
apiRouter.use('/cidrToMask', cidrToMask);
apiRouter.use('/maskToCidr', maskToCidr);

export default apiRouter;
