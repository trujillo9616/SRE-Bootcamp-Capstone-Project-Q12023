import jwt from 'jsonwebtoken';

export const generateAuthResponse = (principalId: string, effect: string, resource: string) => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};

export const getToken = (event: any) => {
  const token = event.headers.Authorization.split(' ');
  if (token[0] !== 'Bearer') {
    throw new Error('Invalid token');
  }
  return token[1];
};

export const verifyToken = (token: string, secret: string) => {
  const decoded = jwt.verify(token, secret);
  if (!decoded || typeof decoded === 'string') {
    throw new Error('Invalid token');
  }
};
