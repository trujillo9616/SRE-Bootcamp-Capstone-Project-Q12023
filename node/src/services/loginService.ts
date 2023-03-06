import config from '../config';
import userService from './userService';
import passwordService from './passwordService';
import tokenService from './tokenService';

export default {
	generateToken: async (
		username: string,
		password: string,
		expiration?: string
	) => {
		const user = await userService.findUser(username);
		passwordService.verifyPassword(password, user.salt, user.password);
		return tokenService.signToken(
			{ role: user.role },
			expiration || config.jwtExpiration
		);
	},
};
