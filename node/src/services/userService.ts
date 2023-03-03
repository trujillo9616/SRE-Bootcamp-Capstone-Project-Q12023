import { prisma } from '../utils/prisma';

export default {
	findUser: async (username: string) => {
		const user = await prisma.users.findUnique({
			where: {
				username,
			},
		});
		if (!user) {
			const error = new Error('User not found');
			error.name = 'UserNotFound';
			throw error;
		}
		return user;
	},
};
