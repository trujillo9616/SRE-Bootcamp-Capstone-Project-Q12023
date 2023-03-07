import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import sinon from 'sinon';

import { authService } from '../../services';
import app from '../../server';

const api = supertest(app);

let validateToken: sinon.SinonSpy;

describe('GET /api/cidrToMask', function () {
	before(function () {
		validateToken = sinon
			.stub(authService, 'validateToken')
			.returns({ role: 'test' });
	});

	after(function () {
		validateToken.restore();
	});

	describe('when sending authorization header', function () {
		describe('when sending valid cidr', function () {
			it('should return 200 status and mask', async function () {
				const response = await api
					.get('/api/cidrToMask')
					.set('Authorization', 'Bearer token')
					.query({ value: '24' })
					.expect(200)
					.expect('Content-Type', /application\/json/);
				expect(response.body).to.have.property('function');
				expect(response.body).to.have.property('input');
				expect(response.body).to.have.property('output');
				expect(response.body.function).to.equal('cidrToMask');
				expect(response.body.input).to.equal('24');
				expect(response.body.output).to.equal('255.255.255.0');
			});
		});

		describe('when sending invalid cidr', function () {
			it('should return 400 status and error message', async function () {
				const response = await api
					.get('/api/cidrToMask')
					.set('Authorization', 'Bearer token')
					.query({ value: 'abc' })
					.expect(400)
					.expect('Content-Type', /application\/json/);
				expect(response.body).to.have.property('error');
				expect(response.body.error).to.equal('Invalid CIDR!');
			});
		});
	});
});
