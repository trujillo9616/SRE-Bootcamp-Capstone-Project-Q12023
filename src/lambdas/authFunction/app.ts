import { APIGatewayRequestAuthorizerEvent, AuthResponse } from 'aws-lambda';

export const lambdaHandler = async (event: APIGatewayRequestAuthorizerEvent): Promise<AuthResponse> => {
  return {
    principalId: 'user',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
  };
};
