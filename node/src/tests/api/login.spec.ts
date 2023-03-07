import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import sinon from 'sinon';

import app from '../../server';
import userService from '../../services/userService';
import passwordService from '../../services/passwordService';
import tokenService from '../../services/tokenService';
import { usernameError, passwordError } from '../../utils/errors';

const api = supertest(app);

let findUser: sinon.SinonSpy;
let signToken: sinon.SinonSpy;
let verifyPassword: sinon.SinonSpy;

describe('POST /api/login', function () {
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
			.rejects(passwordError());
		signToken = sinon.stub(tokenService, 'signToken').returns('token');
	});

	after(function () {
		findUser.restore();
		verifyPassword.restore();
		signToken.restore();
	});

	describe('when sending correct username and password', function () {
		it('should return 200 status and token', async function () {
			const response = await api
				.post('/api/login')
				.send({ username: 'test', password: 'test' })
				.expect(200)
				.expect('Content-Type', /application\/json/);
			expect(response.body).to.have.property('token');
			expect(response.body.token).to.equal('token');
			sinon.assert.callOrder(findUser, verifyPassword, signToken);
			sinon.assert.calledOnce(findUser);
			sinon.assert.calledOnce(verifyPassword);
			sinon.assert.calledOnce(signToken);
		});
	});

	describe('when sending incorrect username', function () {
		it('should return 401 status and error message', async function () {
			try {
				await api
					.post('/api/login')
					.send({ username: 'wrong', password: 'test' });
			} catch (error) {
				expect(error).to.be.an('error');
				expect(error.status).to.equal(401);
				expect(error.response.body).to.have.property('error');
				expect(error.response.body.error).to.equal(
					'Username or password is incorrect'
				);
			}
			sinon.assert.callOrder(findUser);
			sinon.assert.calledTwice(findUser);
			sinon.assert.calledOnce(verifyPassword);
			sinon.assert.calledOnce(signToken);
		});
	});

	describe('when sending incorrect password', function () {
		it('should return 401 status and error message', async function () {
			try {
				await api
					.post('/api/login')
					.send({ username: 'test', password: 'wrong' });
			} catch (error) {
				expect(error).to.be.an('error');
				expect(error.status).to.equal(401);
				expect(error.response.body).to.have.property('error');
				expect(error.response.body.error).to.equal(
					'Username or password is incorrect'
				);
			}
			sinon.assert.callOrder(findUser, verifyPassword);
			sinon.assert.calledThrice(findUser);
			sinon.assert.calledTwice(verifyPassword);
			sinon.assert.calledTwice(signToken);
		});
	});

	describe('when sending no username', function () {
		it('should return 400 status and error message', async function () {
			const response = await api
				.post('/api/login')
				.send({ password: 'test' })
				.expect(400)
				.expect('Content-Type', /application\/json/);
			expect(response.body).to.have.property('error');
			expect(response.body.error).to.equal('Username and password required');
		});
	});

	describe('when sending no password', function () {
		it('should return 400 status and error message', async function () {
			const response = await api
				.post('/api/login')
				.send({ username: 'test' })
				.expect(400)
				.expect('Content-Type', /application\/json/);
			expect(response.body).to.have.property('error');
			expect(response.body.error).to.equal('Username and password required');
		});
	});
});
