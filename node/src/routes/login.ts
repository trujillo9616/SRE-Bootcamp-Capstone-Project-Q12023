import express, { Request, Response, NextFunction } from 'express';
import { loginService } from '../services';

const loginRouter = express.Router();

/**
 * @swagger
 * /api/login:
 *  post:
 *   tags: [Login]
 *   summary: Login to the API
 *   description: Makes a login to the API and returns a JWT token that can be used to authenticate the user in the protected endpoints
 *   requestBody:
 *     description: User credentials
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *   responses:
 *     200:
 *       description: Successfully authenticated
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     400:
 *       description: Missing parameters error
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *             error:
 *               type: string
 *     401:
 *       description: Invalid credentials error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 */

loginRouter.post(
	'/',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { username, password } = req.body;
			if (!username || !password) {
				return res
					.status(400)
					.send({ error: 'Username and password required' });
			}
			return res.send({
				token: await loginService.generateToken(username, password),
			});
		} catch (error) {
			return next(error);
		}
	}
);

export default loginRouter;
