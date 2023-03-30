import { PolicyDocument } from 'aws-lambda';
import jwt from 'jsonwebtoken';

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

export function verifyToken(token: string, secret: string) {
  const decoded = jwt.verify(token, secret);
  if (!decoded || typeof decoded === 'string') {
    throw new Error('Invalid token');
  }
}
