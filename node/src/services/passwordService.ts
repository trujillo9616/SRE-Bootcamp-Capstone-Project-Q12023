import crypto from 'crypto';
import { passwordError } from '../utils/errors';

const passwordService = {
	generateSalt: () => {
		return crypto.randomBytes(16).toString('hex');
	},
	hashPassword: (password: string, salt: string) => {
		return crypto
			.createHash('sha512')
			.update(password + salt)
			.digest('hex');
	},
	verifyPassword: (password: string, salt: string, hashedPassword: string) => {
		if (hashedPassword === passwordService.hashPassword(password, salt)) {
			return true;
		}
		throw passwordError();
	},
};

export default passwordService;
