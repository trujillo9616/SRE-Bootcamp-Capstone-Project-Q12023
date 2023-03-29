import { APIGatewayRequestAuthorizerEvent, AuthResponse } from 'aws-lambda';
import { getToken, verifyToken, generateAuthResponse } from './utils';
import { SecretsManager } from './utils/secretsManager';

export const lambdaHandler = async (event: APIGatewayRequestAuthorizerEvent): Promise<AuthResponse> => {
  let authResponse: AuthResponse;
  const JWT_SECRET = await SecretsManager.getSecretValue('JWT_SECRET', 'us-east-2');
  try {
    const token = getToken(event);
    verifyToken(token, JWT_SECRET as string);
    authResponse = generateAuthResponse('*', 'Allow', '*');
  } catch (error) {
    authResponse = generateAuthResponse('*', 'Deny', '*');
  }
  return authResponse;
};
