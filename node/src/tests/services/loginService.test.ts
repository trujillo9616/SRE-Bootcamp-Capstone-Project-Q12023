import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import loginService from '../../services/loginService';
import userService from '../../services/userService';
import passwordService from '../../services/passwordService';
import tokenService from '../../services/tokenService';
import { usernameError } from '../../utils/errors';

let findUser: sinon.SinonStub<any, unknown>;
let verifyPassword: sinon.SinonStub<any, unknown>;
let signToken: sinon.SinonStub<any, unknown>;

describe('loginService', function () {
	before(function () {
		const testUser = {
			username: 'test',
			password: 'hashedPassword',
			salt: 'salt',
			role: 'testRole',
		};
		findUser = sinon
			.stub(userService, 'findUser')
			.onFirstCall()
			.resolves(testUser)
			.onSecondCall()
			.rejects(usernameError())
			.onThirdCall()
			.resolves(testUser);
		verifyPassword = sinon
			.stub(passwordService, 'verifyPassword')
			.onFirstCall()
			.resolves(true)
			.onSecondCall()
			.resolves(true);
		signToken = sinon.stub(tokenService, 'signToken').returns('token');
	});

	after(function () {
		findUser.restore();
		verifyPassword.restore();
		signToken.restore();
	});

	describe('generateToken', function () {
		it('should return a token', async function () {
			const token = await loginService.generateToken('test', 'password');
			expect(token).to.be.a('string');
			sinon.assert.callOrder(findUser, verifyPassword, signToken);
			sinon.assert.calledOnce(findUser);
			sinon.assert.calledOnce(verifyPassword);
			sinon.assert.calledOnce(signToken);
		});

		it('should throw an error if user is not found', async function () {
			try {
				await loginService.generateToken('test', 'password');
			} catch (error) {
				expect(error).to.be.an('error');
				expect(error).to.have.property('name', 'UserNotFoundError');
				expect(error).to.have.property(
					'message',
					'Invalid username or password'
				);
			}
			sinon.assert.callOrder(findUser);
			sinon.assert.calledTwice(findUser);
			sinon.assert.calledOnce(verifyPassword);
			sinon.assert.calledOnce(signToken);
		});

		it('should throw an error if password is invalid', async function () {
			try {
				await loginService.generateToken('test', 'password');
			} catch (error) {
				expect(error).to.be.an('error');
				expect(error).to.have.property('name', 'InvalidPasswordError');
				expect(error).to.have.property(
					'message',
					'Invalid username or password'
				);
			}
			sinon.assert.callOrder(findUser, verifyPassword);
			sinon.assert.calledThrice(findUser);
			sinon.assert.calledTwice(verifyPassword);
			sinon.assert.calledTwice(signToken);
		});
	});
});
