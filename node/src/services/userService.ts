import { prisma } from '../utils/prisma';

export default {
	findUser: async (username: string) => {
		const user = await prisma.users.findUnique({
			where: {
				username,
			},
		});
		if (!user) {
			throw new Error('User not found');
		}
		return user;
	},
};
