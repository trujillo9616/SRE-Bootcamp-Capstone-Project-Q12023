/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import AWS from 'aws-sdk';
import nodeCrypto from 'crypto';
import jwt from 'jsonwebtoken';
const dynamodb = new AWS.DynamoDB.DocumentClient();

const USERS_TABLE = process.env.USERS_TABLE || '';

export const handler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	let response: APIGatewayProxyResult;
	try {
		const [username, password] = getBodyParams(event);
		const user = await getUser(username);
		if (!user) {
			throw new Error('Invalid username or password!');
		}
		if (user.password !== hashPassword(password, user.salt)) {
			throw new Error('Invalid username or password!');
		}
		const token = jwt.sign(
			{ role: user.role },
			'my2w7wjd7yXF64FIADfJxNs1oupTGAuW',
			{
				expiresIn: '1h',
			}
		);
		response = {
			statusCode: 200,
			body: JSON.stringify({
				user,
				token,
			}),
		};
	} catch (error: any) {
		response = {
			statusCode: 400,
			body: JSON.stringify({
				error: error.message,
			}),
		};
	}
	return response;
};

function getBodyParams(event: APIGatewayProxyEvent): string[] {
	if (!event.body) {
		throw new Error('Missing body');
	}
	const body = JSON.parse(event.body);
	if (!body.username || !body.password) {
		throw new Error('Missing username or password');
	}
	return [body.username, body.password];
}

async function getUser(username: string) {
	const params = {
		TableName: USERS_TABLE,
		Key: {
			id: username,
		},
	};
	const result_1 = await dynamodb.get(params).promise();
	return result_1.Item ? result_1.Item : null;
}

function hashPassword(password: string, salt: string) {
	return nodeCrypto
		.createHash('sha512')
		.update(password + salt)
		.digest('hex');
}
