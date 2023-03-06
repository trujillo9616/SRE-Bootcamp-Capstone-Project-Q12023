import { describe, it } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';

import app from '../../server';

describe('middleware', function () {
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
});
