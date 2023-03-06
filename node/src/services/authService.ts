import { Request } from 'express';
import { customError } from '../utils/errors';
import tokenService from './tokenService';

export default {
	validateToken: (req: Request) => {
		const authorization = req.get('authorization');
		if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
			throw customError('Token missing', 'MissingTokenError');
		}
		const token = authorization.split(' ')[1];
		const decodedToken = tokenService.verifyToken(token);
		if (!decodedToken || typeof decodedToken === 'string') {
			throw customError('Token invalid', 'InvalidTokenError');
		}
		return decodedToken;
	},
};
