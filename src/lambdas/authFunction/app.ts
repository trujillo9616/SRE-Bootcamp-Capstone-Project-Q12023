import { APIGatewayRequestAuthorizerEvent, AuthResponse } from 'aws-lambda';
import { generatePolicy, verifyToken } from './utils';
import { SecretsManager } from './utils/secretsManager';

export const lambdaHandler = async (event: APIGatewayRequestAuthorizerEvent): Promise<AuthResponse> => {
  let authResponse: AuthResponse;
  const JWT_SECRET = await SecretsManager.getSecretValue('JWT_SECRET', 'us-east-2');
  try {
    if (!event.headers) {
      throw new Error('Unauthorized');
    }
    const token = event.headers.Authorization || event.headers.authorization;
    if (!token) {
      throw new Error('Unauthorized');
    }
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      throw new Error('Unauthorized');
    }
    await verifyToken(tokenParts[1], JWT_SECRET as string);
    authResponse = {
      principalId: '*',
      policyDocument: generatePolicy('Allow', '*'),
    };
  } catch (error) {
    authResponse = {
      principalId: '*',
      policyDocument: generatePolicy('Deny', '*'),
    };
  }
  return authResponse;
};
