import { describe, it } from 'mocha';
import { expect } from 'chai';

import userService from '../../services/userService';

describe('userService', function () {
	it('should return a user', async function () {
		const expectedUser = {
			username: 'bob',
			role: 'viewer',
		};
		const user = await userService.findUser(expectedUser.username);
		expect(user).to.be.an('object');
		expect(user).to.have.property('username');
		expect(user).to.have.property('password');
		expect(user).to.have.property('salt');
		expect(user).to.have.property('role');
		expect(user.username).to.equal(expectedUser.username);
		expect(user.role).to.equal(expectedUser.role);
	});

	it('should throw an error if user is not found', async function () {
		try {
			await userService.findUser('notAUser');
		} catch (err) {
			expect(err.message).to.equal('Invalid username or password');
		}
	});
});
