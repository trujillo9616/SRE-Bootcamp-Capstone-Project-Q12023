import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { handler } from '../../maskToCidr';

describe('cidrToMask', function () {
	describe('Successful response', function () {
		it('should return a 200 response and a valid body', async () => {
			const queryParameters = {
				value: '255.255.0.0',
			};
			const response: APIGatewayProxyResult = await handler(
				generateEvent(queryParameters)
			);
			expect(response).toHaveProperty('statusCode');
			expect(response.statusCode).toEqual(200);
			expect(response).toHaveProperty('body');
			expect(response.body).toEqual(
				JSON.stringify({
					function: 'maskToCidr',
					input: '255.255.0.0',
					output: '16',
				})
			);
		});
	});

	describe('Unsuccessful response', function () {
		it('should return a 400 response and error when value missing', async () => {
			const response: APIGatewayProxyResult = await handler(generateEvent());
			expect(response.statusCode).toEqual(400);
			expect(response.body).toEqual(
				JSON.stringify({
					error: 'Missing value',
				})
			);
		});

		it('should return a 400 response and error when value is not a number', async () => {
			const queryParameters = {
				value: 'abc',
			};
			const response: APIGatewayProxyResult = await handler(
				generateEvent(queryParameters)
			);
			expect(response.statusCode).toEqual(400);
			expect(response.body).toEqual(
				JSON.stringify({
					error: 'Invalid mask',
				})
			);
		});

		it('should return a 400 response and error when value is invalid mask', async () => {
			const queryParameters = {
				value: '255.255.255.0.0.0.0',
			};
			const response: APIGatewayProxyResult = await handler(
				generateEvent(queryParameters)
			);
			expect(response.statusCode).toEqual(400);
			expect(response.body).toEqual(
				JSON.stringify({
					error: 'Invalid mask',
				})
			);
		});
	});
});

const generateEvent = (
	queryStringParameters: { value?: string } = {}
): APIGatewayProxyEvent => {
	return {
		httpMethod: 'get',
		body: '',
		headers: {},
		isBase64Encoded: false,
		multiValueHeaders: {},
		multiValueQueryStringParameters: {},
		path: '/cidr-to-mask',
		pathParameters: {},
		queryStringParameters,
		requestContext: {
			accountId: '123456789012',
			apiId: '1234',
			authorizer: {},
			httpMethod: 'get',
			identity: {
				accessKey: '',
				accountId: '',
				apiKey: '',
				apiKeyId: '',
				caller: '',
				clientCert: {
					clientCertPem: '',
					issuerDN: '',
					serialNumber: '',
					subjectDN: '',
					validity: { notAfter: '', notBefore: '' },
				},
				cognitoAuthenticationProvider: '',
				cognitoAuthenticationType: '',
				cognitoIdentityId: '',
				cognitoIdentityPoolId: '',
				principalOrgId: '',
				sourceIp: '',
				user: '',
				userAgent: '',
				userArn: '',
			},
			path: '/cidr-to-mask',
			protocol: 'HTTP/1.1',
			requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
			requestTimeEpoch: 1428582896000,
			resourceId: '123456',
			resourcePath: '/cidr-to-mask',
			stage: 'dev',
		},
		resource: '',
		stageVariables: {},
	};
};
