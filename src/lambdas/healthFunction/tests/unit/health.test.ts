import { APIGatewayProxyResult } from 'aws-lambda';
import { handler } from '../../health';

describe('cidrToMask', function () {
	describe('Successful response', function () {
		it('should return a 200 response and status message', async () => {
			const response: APIGatewayProxyResult = await handler();
			expect(response).toHaveProperty('statusCode');
			expect(response.statusCode).toEqual(200);
			expect(response).toHaveProperty('body');
			expect(response.body).toEqual(
				JSON.stringify({
					status: 'OK',
				})
			);
		});
	});
});
