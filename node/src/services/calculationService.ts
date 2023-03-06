import { customError } from '../utils/errors';

const BINARYONE = '1';
const BINARYZERO = '0';
const MINCIDR = 0;
const MAXCIDR = 32;
const MINMASK = 0;
const MAXMASK = 255;
const N = 8;

const decimalToBinary = (number: number) => {
	return (number >> 0).toString(2);
};

const countOnes = (binary: string) => {
	let count = 0;
	let seenZero = false;
	for (let i = 0; i < binary.length; i++) {
		if (seenZero && binary[i] === BINARYONE) {
			throw customError('Invalid mask!', 'InvalidMaskError');
		}
		if (binary[i] === BINARYONE) {
			count++;
		} else {
			seenZero = true;
		}
	}
	return count.toString();
};

export default {
	cidrToMask: (cidr: string) => {
		const cidrNumber = parseInt(cidr);
		if (isNaN(cidrNumber) || cidrNumber < MINCIDR || cidrNumber > MAXCIDR) {
			throw customError('Invalid CIDR!', 'InvalidCidrError');
		}
		const mask = [];
		const fullAddress =
			BINARYONE.repeat(cidrNumber) + BINARYZERO.repeat(MAXCIDR - cidrNumber);
		for (let i = 0; i < 4; i++) {
			mask.push(parseInt(fullAddress.slice(i * N, i * N + N), 2));
		}
		return mask.join('.');
	},
	maskToCidr: (mask: string) => {
		const maskArray = mask.split('.');
		if (maskArray.length !== 4) {
			throw customError('Invalid mask!', 'InvalidMaskError');
		}
		for (let i = 0; i < maskArray.length; i++) {
			if (maskArray[i] === '' || isNaN(parseInt(maskArray[i]))) {
				throw customError('Invalid mask!', 'InvalidMaskError');
			}
			const maskNumber = parseInt(maskArray[i]);
			if (maskNumber < MINMASK || maskNumber > MAXMASK) {
				throw customError('Invalid mask!', 'InvalidMaskError');
			}
			maskArray[i] = decimalToBinary(maskNumber);
		}
		return countOnes(maskArray.join(''));
	},
};
