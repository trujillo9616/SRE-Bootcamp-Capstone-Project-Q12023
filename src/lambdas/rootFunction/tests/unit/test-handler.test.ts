import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import healthEvent from '../../../../events/health.json';

describe('Unit test for app handler', function () {
  it('verifies successful response', async () => {
    const event: APIGatewayProxyEvent = healthEvent;
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toBeDefined();
    const body = JSON.parse(result.body);
    expect(body.status).toBeDefined();
    expect(typeof body.status).toEqual('string');
  });
});
