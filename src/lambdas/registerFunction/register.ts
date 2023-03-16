/* eslint-disable @typescript-eslint/no-var-requires */
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const USERS_TABLE = process.env.USERS_TABLE || '';

// type User = {
// 	id: string;
// 	username: string;
// 	salt: string;
// 	password: string;
// 	role: string;
// };

export const handler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	let response: APIGatewayProxyResult;

	try {
		const [username, password, role] = getBodyParameters(event);

		response = {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Hello register!',
				username,
				password,
				role,
				table: USERS_TABLE,
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

const getBodyParameters = (event: APIGatewayProxyEvent): string[] => {
	if (!event.body) throw new Error('No body provided');
	const body = JSON.parse(event.body);
	if (!body.username || !body.password || !body.role) {
		throw new Error(
			'Missing parameters! Username, password and role are required.'
		);
	}
	return [body.username, body.password, body.role];
};

// const findUser = async (
// 	username: string
// ): Promise<User | AttributeMap | null> => {
// 	const params = {
// 		TableName: USERS_TABLE,
// 		Key: {
// 			username,
// 		},
// 	};
// 	return await dynamoDB
// 		.get(params)
// 		.promise()
// 		.then(result => (result.Item ? result.Item : null));
// };
