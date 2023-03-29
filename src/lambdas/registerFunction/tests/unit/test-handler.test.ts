import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { jest } from '@jest/globals';
import { lambdaHandler } from '../../app';
import registerEvent from '../../../../events/register.json';

import { userService } from '../../utils';
const mockUser = {
  id: 'test',
  username: 'test',
  password: 'test',
  role: 'test',
  salt: 'test',
};

describe('Unit test for app handler', function () {
  beforeAll(() => {
    jest
      .spyOn(userService, 'getUser')
      .mockImplementationOnce(() => Promise.resolve(null))
      .mockImplementationOnce(() => Promise.resolve(mockUser));
    jest.spyOn(userService, 'saveUser').mockImplementation(() => Promise.resolve(mockUser));
  });

  it('verifies successful response', async () => {
    const event: APIGatewayProxyEvent = {
      ...registerEvent,
      body: JSON.stringify({
        username: 'test',
        password: 'test',
        role: 'test',
      }),
    };
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(
      JSON.stringify({
        function: 'registerFunction',
        output: 'User test created!',
      }),
    );
  });

  it('verifies error response when user already exist', async () => {
    const event: APIGatewayProxyEvent = {
      ...registerEvent,
      body: JSON.stringify({
        username: 'test',
        password: 'test',
        role: 'test',
      }),
    };
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        status: 'ERROR',
        error: 'User already exists',
      }),
    );
  });

  it('verifies error response when parameters are missing', async () => {
    const event: APIGatewayProxyEvent = registerEvent;
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        status: 'ERROR',
        error: 'Missing body',
      }),
    );
  });

  it('verifies error response when parameters are missing', async () => {
    const event: APIGatewayProxyEvent = {
      ...registerEvent,
      body: JSON.stringify({
        username: 'test',
        password: 'test',
      }),
    };
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        status: 'ERROR',
        error: 'Missing username, password or role!',
      }),
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
