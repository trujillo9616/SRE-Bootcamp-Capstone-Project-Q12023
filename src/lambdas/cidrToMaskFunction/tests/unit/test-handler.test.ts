import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import cidrToMaskEvent from '../../../../events/cidrToMask.json';

describe('Unit test for app handler', function () {
  it('verifies successful response', async () => {
    const event: APIGatewayProxyEvent = {
      ...cidrToMaskEvent,
      queryStringParameters: {
        value: '16',
      },
    };
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(
      JSON.stringify({
        function: 'cidr-to-mask',
        input: '16',
        output: '255.255.0.0',
      }),
    );
  });

  it('verifies error response', async () => {
    const event: APIGatewayProxyEvent = cidrToMaskEvent;
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        function: 'cidr-to-mask',
        error: 'Missing value query parameter!',
      }),
    );
  });

  it('verifies error response', async () => {
    const event: APIGatewayProxyEvent = {
      ...cidrToMaskEvent,
      queryStringParameters: {
        value: '56',
      },
    };
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        function: 'cidr-to-mask',
        error: 'Invalid CIDR value!',
      }),
    );
  });

  it('verifies error response', async () => {
    const event: APIGatewayProxyEvent = {
      ...cidrToMaskEvent,
      queryStringParameters: {
        value: '-0',
      },
    };
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        function: 'cidr-to-mask',
        error: 'Invalid CIDR value!',
      }),
    );
  });
});
