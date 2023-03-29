/* eslint-disable @typescript-eslint/no-var-requires */
import { APIGatewayProxyEvent } from 'aws-lambda';
import nodeCrypto from 'crypto';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const USERS_TABLE = process.env.USERS_TABLE || '';

export function getBodyParams(event: APIGatewayProxyEvent): [string, string, string] {
  if (!event.body) {
    throw new Error('Missing body');
  }
  const body = JSON.parse(event.body);
  if (!body.username || !body.password || !body.role) {
    throw new Error('Missing username, password or role!');
  }
  return [body.username, body.password, body.role];
}

export function hashPassword(password: string, salt: string): string {
  return nodeCrypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex');
}

export function generateSalt(): string {
  return nodeCrypto.randomBytes(16).toString('hex');
}

export const userService = {
  getUser: async (username: string) => {
    const params = {
      TableName: USERS_TABLE,
      Key: {
        id: username,
      },
    };
    return dynamoDb
      .get(params)
      .promise()
      .then((result: any) => (result.Item ? result.Item : null));
  },
  saveUser: async (user: any) => {
    const params = {
      TableName: USERS_TABLE,
      Item: user,
    };
    return dynamoDb
      .put(params)
      .promise()
      .then(() => user);
  },
};
