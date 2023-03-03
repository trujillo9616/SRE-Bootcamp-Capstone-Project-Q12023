import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

export default {
	signToken: (data: { role: string }, expiration: string) => {
		return jwt.sign(data, config.jwtSecret, {
			expiresIn: expiration,
		});
	},
	verifyToken: (token: string) => {
		return jwt.verify(token, config.jwtSecret) as JwtPayload;
	},
};
