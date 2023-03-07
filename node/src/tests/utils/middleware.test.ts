import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import sinon from 'sinon';

import { customError } from '../../utils/errors';
import { authService, calculationService } from '../../services';

import app from '../../server';

let validateToken: sinon.SinonStub;
let cidrToMask: sinon.SinonStub;
let maskToCidr: sinon.SinonStub;

describe('middleware', function () {
	before(function () {
		validateToken = sinon
			.stub(authService, 'validateToken')
			.onCall(0)
			.returns({ role: 'test' })
			.onCall(1)
			.returns({ role: 'test' })
			.onCall(2)
			.throws(customError('Token missing', 'MissingTokenError'))
			.onCall(3)
			.throws(customError('Token invalid', 'InvalidTokenError'));
		cidrToMask = sinon
			.stub(calculationService, 'cidrToMask')
			.throws(customError('Invalid CIDR!', 'InvalidCidrError'));
		maskToCidr = sinon
			.stub(calculationService, 'maskToCidr')
			.throws(customError('Invalid mask!', 'InvalidMaskError'));
	});

	after(function () {
		validateToken.restore();
		cidrToMask.restore();
		maskToCidr.restore();
	});

	describe('unknownEndpoint', function () {
		it('should return 404 status and error message', async function () {
			const response = await supertest(app)
				.get('/api/unknown')
				.expect(404)
				.expect('Content-Type', /application\/json/);
			expect(response.body).to.have.property('error');
			expect(response.body.error).to.equal('unknown endpoint');
		});
	});

	describe('errorHandler', function () {
		describe('InvalidCidrError', function () {
			it('should return 400 status and error message', async function () {
				const response = await supertest(app)
					.get('/api/cidrToMask')
					.query({ value: 'abc' })
					.expect(400)
					.expect('Content-Type', /application\/json/);
				expect(response.body).to.have.property('error');
				expect(response.body.error).to.equal('Invalid CIDR!');
			});
		});

		describe('InvalidMaskError', function () {
			it('should return 400 status and error message', async function () {
				const response = await supertest(app)
					.get('/api/maskToCidr')
					.query({ value: 'abc' })
					.expect(400)
					.expect('Content-Type', /application\/json/);
				expect(response.body).to.have.property('error');
				expect(response.body.error).to.equal('Invalid mask!');
			});
		});

		describe('MissingTokenError', function () {
			it('should return 401 status and error message', async function () {
				const response = await supertest(app)
					.get('/api/maskToCidr')
					.expect(401)
					.expect('Content-Type', /application\/json/);
				expect(response.body).to.have.property('error');
				expect(response.body.error).to.equal('Token missing');
			});
		});

		describe('InvalidTokenError', function () {
			it('should return 401 status and error message', async function () {
				const response = await supertest(app)
					.get('/api/maskToCidr')
					.expect(401)
					.expect('Content-Type', /application\/json/);
				expect(response.body).to.have.property('error');
				expect(response.body.error).to.equal('Token invalid');
			});
		});
	});
});
