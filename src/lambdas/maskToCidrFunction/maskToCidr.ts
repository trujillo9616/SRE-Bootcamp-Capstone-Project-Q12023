/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
const MASK_LENGTH = 4;
const MIN_MASK = 0;
const MAX_MASK = 255;
const BINARY_ONE = '1';
const BINARY_ZERO = '0';

let response: APIGatewayProxyResult;

export const handler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const mask = getValue(event);
		response = {
			statusCode: 200,
			body: JSON.stringify({
				function: 'maskToCidr',
				input: mask,
				output: maskToCidr(mask),
			}),
		};
	} catch (error: any) {
		response = {
			statusCode: 400,
			body: JSON.stringify({
				error: error.message,
			}),
		};
	}
	return response;
};

function getValue(event: APIGatewayProxyEvent): string {
	if (!event.queryStringParameters || !event.queryStringParameters.value) {
		throw new Error('Missing value');
	}
	return event.queryStringParameters.value;
}

function maskToCidr(mask: string) {
	const maskOctets = mask.split('.');
	if (maskOctets.length !== MASK_LENGTH) {
		throw new Error('Invalid mask');
	}
	for (let i = 0; i < maskOctets.length; i++) {
		const octet = parseInt(maskOctets[i]);
		if (isNaN(octet) || octet < MIN_MASK || octet > MAX_MASK) {
			throw new Error('Invalid mask');
		}
		maskOctets[i] = decimalToBinary(octet);
	}
	return countOnes(maskOctets.join(''));
}

function decimalToBinary(decimal: number) {
	return (decimal >> 0).toString(2);
}

function countOnes(binary: string) {
	let count = 0;
	let seenZero = false;
	for (let i = 0; i < binary.length; i++) {
		if (seenZero && binary[i] === BINARY_ONE) {
			throw new Error('Invalid mask');
		}
		if (binary[i] === BINARY_ZERO) {
			seenZero = true;
		} else {
			count++;
		}
	}
	return count.toString();
}
