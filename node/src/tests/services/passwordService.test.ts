import { describe, it } from 'mocha';
import { expect } from 'chai';

import passwordService from '../../services/passwordService';

describe('passwordService', function () {
	describe('generateSalt', function () {
		it('should return a salt', function () {
			const salt = passwordService.generateSalt();
			expect(salt).to.be.a('string');
		});
	});

	describe('hashPassword', function () {
		const salt = passwordService.generateSalt();
		const password = 'password';
		expect(passwordService.hashPassword(password, salt)).to.be.a('string');
	});

	describe('verifyPassword', function () {
		const salt = passwordService.generateSalt();
		const password = 'password';
		const hashedPassword = passwordService.hashPassword(password, salt);

		it('should return true when valid', function () {
			const valid = passwordService.verifyPassword(
				password,
				salt,
				hashedPassword
			);
			expect(valid).to.equal(true);
		});

		it('should throw an error when invalid', function () {
			try {
				passwordService.verifyPassword('invalidPassword', salt, hashedPassword);
			} catch (err) {
				expect(err.name).to.equal('InvalidPasswordError');
			}
		});
	});
});
