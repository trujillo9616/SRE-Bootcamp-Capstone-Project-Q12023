/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
const BINARY_ONE = '1';
const BINARY_ZERO = '0';
const MIN_CIDR = 0;
const MAX_CIDR = 32;
const N = 8;

export const handler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	let response: APIGatewayProxyResult;
	try {
		const cidr = getValue(event);
		response = {
			statusCode: 200,
			body: JSON.stringify({
				function: 'cidrToMask',
				input: cidr,
				output: cidrToMask(cidr),
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

function cidrToMask(cidr: string) {
	const cidrInt = parseInt(cidr);
	if (isNaN(cidrInt) || cidrInt < MIN_CIDR || cidrInt > MAX_CIDR) {
		throw new Error('Invalid CIDR');
	}
	const mask = [];
	const fullOctets =
		BINARY_ONE.repeat(cidrInt) + BINARY_ZERO.repeat(MAX_CIDR - cidrInt);
	for (let i = 0; i < MAX_CIDR; i += N) {
		mask.push(parseInt(fullOctets.slice(i, i + N), 2));
	}
	return mask.join('.');
}
