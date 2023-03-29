import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import maskToCidrEvent from '../../../../events/cidrToMask.json';

describe('Unit test for app handler', function () {
  it('verifies successful response', async () => {
    const event: APIGatewayProxyEvent = {
      ...maskToCidrEvent,
      queryStringParameters: {
        value: '255.255.0.0',
      },
    };
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(
      JSON.stringify({
        function: 'mask-to-cidr',
        input: '255.255.0.0',
        output: '16',
      }),
    );
  });

  it('verifies error response', async () => {
    const event: APIGatewayProxyEvent = maskToCidrEvent;
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        function: 'mask-to-cidr',
        error: 'Missing value query parameter!',
      }),
    );
  });

  it('verifies error response', async () => {
    const event: APIGatewayProxyEvent = {
      ...maskToCidrEvent,
      queryStringParameters: {
        value: '255.0.0.0.0.0',
      },
    };
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        function: 'mask-to-cidr',
        error: 'Invalid mask value!',
      }),
    );
  });

  it('verifies error response', async () => {
    const event: APIGatewayProxyEvent = {
      ...maskToCidrEvent,
      queryStringParameters: {
        value: '123.54.12.0',
      },
    };
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        function: 'mask-to-cidr',
        error: 'Invalid mask value!',
      }),
    );
  });
});
