import { PolicyDocument } from 'aws-lambda';
import * as jose from 'jose';

export function generatePolicy(effect: string, resource: string): PolicyDocument {
  const policyDocument = {} as PolicyDocument;
  if (effect && resource) {
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {} as any;
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
  }
  return policyDocument;
}

export async function verifyToken(token: string, secret: string) {
  const encodedSecret = Buffer.from(secret, 'base64');
  try {
    const { payload } = await jose.jwtVerify(token, encodedSecret, {
      issuer: 'https://dev-f7of8fjcd3if65ht.us.auth0.com/',
      audience: 'https://auth0-jwt-authorizer',
    });
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
