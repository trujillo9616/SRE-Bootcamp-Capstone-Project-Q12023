import { describe, it } from 'mocha';
import { expect } from 'chai';

import { usernameError, passwordError } from '../../utils/errors';

describe('usernameError', function () {
	it('should return an error with name UserNotFoundError', function () {
		const error = usernameError();
		expect(error.name).to.equal('UserNotFoundError');
	});
});

describe('passwordError', function () {
	it('should return an error with name InvalidPasswordError', function () {
		const error = passwordError();
		expect(error.name).to.equal('InvalidPasswordError');
	});
});
