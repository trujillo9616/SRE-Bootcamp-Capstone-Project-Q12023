import { describe, it } from 'mocha';
import { expect } from 'chai';

import tokenService from '../../services/tokenService';

describe('tokenService', function () {
	describe('signToken', function () {
		it('should return a token', function () {
			const data = { role: 'testRole' };
			const expiration = '1h';
			const token = tokenService.signToken(data, expiration);
			expect(token).to.be.a('string');
		});
	});

	describe('verifyToken', function () {
		it('should return a payload when valid', function () {
			const data = { role: 'testRole' };
			const expiration = '1h';
			const token = tokenService.signToken(data, expiration);
			const payload = tokenService.verifyToken(token);
			expect(payload).to.be.a('object');
			expect(payload.role).to.equal('testRole');
		});

		it('should throw an error when invalid', function () {
			try {
				tokenService.verifyToken('invalidToken');
			} catch (err) {
				expect(err.name).to.equal('JsonWebTokenError');
			}
		});

		it('should throw an error when expired', function () {
			const data = { role: 'testRole' };
			const expiration = '1ms';
			const token = tokenService.signToken(data, expiration);
			setTimeout(() => {
				try {
					tokenService.verifyToken(token);
				} catch (err) {
					expect(err.name).to.equal('TokenExpiredError');
				}
			}, 1000);
		});
	});
});
