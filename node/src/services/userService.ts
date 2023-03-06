import { prisma } from '../utils/prisma';
import { usernameError } from '../utils/errors';

export default {
	findUser: async (username: string) => {
		const user = await prisma.users.findUnique({
			where: {
				username,
			},
		});
		if (!user) {
			throw usernameError();
		}
		return user;
	},
};
