import { APIGatewayProxyEvent } from "aws-lambda";
import AWS from "aws-sdk";
const dynamoDb = new AWS.DynamoDB.DocumentClient();
import nodeCrypto from "crypto";
import jwt from "jsonwebtoken";

const USERS_TABLE = process.env.USERS_TABLE || "";

export function getBodyParams(event: APIGatewayProxyEvent): string[] {
  if (!event.body) {
    throw new Error("Missing body!");
  }
  const body = JSON.parse(event.body);
  if (!body.username || !body.password) {
    throw new Error("Missing username or password!");
  }
  return [body.username, body.password];
}

export const authService = {
  signToken: (payload: object, secret: string) => {
    return jwt.sign(payload, secret, {
      expiresIn: "1h",
    });
  },
  verifyPassword: (
    hashedPassword: string,
    password: string,
    salt: string
  ): boolean => {
    return (
      hashedPassword !==
      nodeCrypto
        .createHash("sha256")
        .update(password + salt)
        .digest("hex")
    );
  },
};

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
};
