import express, { Request, Response } from 'express';

const healthRouter = express.Router();

/**
 * @swagger
 * /api/_health:
 *  get:
 *   tags: [Health]
 *   summary: Returns the API status
 *   description: Returns the API status, this is the preffered way of checking the API status.
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
healthRouter.get('/', (_req: Request, res: Response) => {
	return res.send({ status: 'OK' });
});

export default healthRouter;
