import crypto from 'crypto';

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
		const error = new Error('Invalid password, please check your credentials');
		error.name = 'InvalidPasswordError';
		throw error;
	},
};

export default passwordService;
