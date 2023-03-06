/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Request } from 'express';
import { authService, tokenService } from '../../services';

const invalid =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzgwNzU1ODcsImV4cCI6MTY3ODA3OTE4N30.z8teOw9GzJRZi1GZZfTBv8SSiEsnt64XWQ6wew1_3xF';

describe('authService', function () {
	describe('when given a valid token', function () {
		it('should return the decoded token', function () {
			const token = tokenService.signToken({ role: 'test' }, '1min');
			const decodedToken = authService.validateToken({
				get: (_name: string) => `Bearer ${token}`,
			} as Request);
			expect(decodedToken).to.be.an('object');
			expect(decodedToken).to.include({ role: 'test' });
		});
	});

	describe('when given an invalid token', function () {
		it('should throw an error', function () {
			const token = `Bearer ${invalid}`;
			expect(() =>
				authService.validateToken({
					get: (_name: string) => token,
				} as Request)
			).to.throw(Error);
		});
	});

	describe('when given no token', function () {
		it('should throw an error', function () {
			expect(() =>
				authService.validateToken({
					get: (_name: string) => '',
				} as Request)
			).to.throw(Error);
		});
	});
});
