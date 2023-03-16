/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyResult } from 'aws-lambda';

let response: APIGatewayProxyResult;

export const handler = async () => {
	try {
		response = {
			statusCode: 200,
			body: JSON.stringify({
				status: 'OK',
			}),
		};
	} catch (error: any) {
		response = {
			statusCode: 500,
			body: JSON.stringify({
				error: error.message,
			}),
		};
	}
	return response;
};
