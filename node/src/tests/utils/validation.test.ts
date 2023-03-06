import { describe, it } from 'mocha';
import { expect } from 'chai';

import validateValue from '../../utils/validation';

describe('validation utils', function () {
	it('should throw an error when given no value', function () {
		expect(() => validateValue(undefined, 'string')).to.throw(Error);
	});

	it('should throw an error when given a value of the wrong type', function () {
		expect(() => validateValue(123, 'string')).to.throw(Error);
	});
});
