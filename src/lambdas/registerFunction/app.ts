/* eslint-disable @typescript-eslint/no-var-requires */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getBodyParams, hashPassword, generateSalt, userService } from './utils';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;
  try {
    const [username, password, role] = getBodyParams(event);
    const user = await userService.getUser(username);
    if (user) {
      throw new Error('User already exists');
    }
    const salt = generateSalt();
    const userData = {
      id: username,
      username,
      salt,
      password: hashPassword(password, salt),
      role,
    };
    const savedUser = await userService.saveUser(userData);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        function: 'registerFunction',
        output: `User ${savedUser.username} created!`,
      }),
    };
  } catch (error: any) {
    response = {
      statusCode: 400,
      body: JSON.stringify({
        status: 'ERROR',
        error: error.message,
      }),
    };
  }
  return response;
};
