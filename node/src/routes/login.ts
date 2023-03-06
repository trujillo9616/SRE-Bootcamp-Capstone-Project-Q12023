import express, { Request, Response, NextFunction } from 'express';
import { loginService } from '../services';

const loginRouter = express.Router();

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
