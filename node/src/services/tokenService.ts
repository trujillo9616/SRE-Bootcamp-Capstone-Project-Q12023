import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

export const signToken = (data: { role: string }, expiration: string) => {
	return jwt.sign(data, config.jwtSecret, {
		expiresIn: expiration,
	});
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, config.jwtSecret) as JwtPayload;
};
