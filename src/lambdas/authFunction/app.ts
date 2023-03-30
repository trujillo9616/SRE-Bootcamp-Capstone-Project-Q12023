import { APIGatewayTokenAuthorizerEvent, AuthResponse } from 'aws-lambda';
import { generatePolicy, verifyToken } from './utils';
import { SecretsManager } from './utils/secretsManager';

export const lambdaHandler = async (event: APIGatewayTokenAuthorizerEvent): Promise<AuthResponse> => {
  console.log('event', event);
  let authResponse: AuthResponse;
  const JWT_SECRET = await SecretsManager.getSecretValue('JWT_SECRET', 'us-east-2');
  try {
    if (!event.authorizationToken) {
      throw new Error('Unauthorized');
    }
    const token = event.authorizationToken.substring(7);
    await verifyToken(token, JWT_SECRET as string);
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
