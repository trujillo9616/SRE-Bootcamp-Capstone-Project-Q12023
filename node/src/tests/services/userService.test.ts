import { describe, it } from 'mocha';
import { expect } from 'chai';

import userService from '../../services/userService';

describe('userService', function () {
	it('should return a user', async function () {
		const expectedUser = {
			username: 'test',
			password: 'hashedPassword',
			salt: 'salt',
			role: 'testRole',
		};
		const user = await userService.findUser('test');
		expect(user).to.deep.equal(expectedUser);
	});

	it('should throw an error if user is not found', async function () {
		try {
			await userService.findUser('notAUser');
		} catch (err) {
			expect(err.message).to.equal('Invalid username or password');
		}
	});
});
