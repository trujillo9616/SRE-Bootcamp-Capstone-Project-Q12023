import { APIGatewayProxyResult } from 'aws-lambda';

let response: APIGatewayProxyResult;

exports.handler = async () => {
	try {
		response = {
			statusCode: 400,
			body: JSON.stringify({
				error: 'Unknown Endpoint',
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
