import { describe, it } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';

import app from '../../server';

const api = supertest(app);

describe('GET /api/_health', function () {
	it('should return 200', async function () {
		const response = await api.get('/api/_health');
		expect(response.status).to.equal(200);
	});

	it('should return status ok message', async function () {
		const response = await api.get('/api/_health');
		expect(response.type).to.equal('application/json');
		expect(response.body).to.have.property('status');
		expect(response.body.status).to.equal('OK');
	});
});
