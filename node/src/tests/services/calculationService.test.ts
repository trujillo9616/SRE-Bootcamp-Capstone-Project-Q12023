import { describe, it } from 'mocha';
import { expect } from 'chai';
import calculationService from '../../services/calculationService';

const cidrMaskMap = {
	'0': '0.0.0.0',
	'24': '255.255.255.0',
	'32': '255.255.255.255',
	'248.0.0.0': '5',
	'255.254.0.0': '15',
	'255.255.255.0': '24',
};

describe('calculationService', function () {
	describe('cidrToMask', function () {
		it('should return the correct mask for a given cidr', function () {
			expect(calculationService.cidrToMask('24')).to.equal(cidrMaskMap['24']);
			expect(calculationService.cidrToMask('0')).to.equal(cidrMaskMap['0']);
			expect(calculationService.cidrToMask('32')).to.equal(cidrMaskMap['32']);
		});
		it('should throw an error if the cidr is invalid', function () {
			expect(() => calculationService.cidrToMask('-1')).to.throw(Error);
			expect(() => calculationService.cidrToMask('33')).to.throw(Error);
			expect(() => calculationService.cidrToMask('abc')).to.throw(Error);
		});
	});

	describe('maskToCidr', function () {
		it('should return the correct cidr for a given mask', function () {
			expect(calculationService.maskToCidr('255.255.255.0')).to.equal(
				cidrMaskMap['255.255.255.0']
			);
			expect(calculationService.maskToCidr('255.254.0.0')).to.equal(
				cidrMaskMap['255.254.0.0']
			);
			expect(calculationService.maskToCidr('248.0.0.0')).to.equal(
				cidrMaskMap['248.0.0.0']
			);
		});

		it('should throw an error if the mask is invalid', function () {
			expect(() => calculationService.maskToCidr('255.255.255.256')).to.throw(
				Error
			);
			expect(() => calculationService.maskToCidr('255.255.255.')).to.throw(
				Error
			);
			expect(() => calculationService.maskToCidr('255.255.255')).to.throw(
				Error
			);
			expect(() => calculationService.maskToCidr('234.356.234.234')).to.throw(
				Error
			);
			expect(() => calculationService.maskToCidr('123.231.116.012')).to.throw(
				Error
			);
			expect(() => calculationService.maskToCidr('abc')).to.throw(Error);
		});
	});
});
