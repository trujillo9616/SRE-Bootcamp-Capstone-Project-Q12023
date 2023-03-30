import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getBodyParams, authService, userService } from "./utils";
import { SecretsManager } from "./utils/secretsManager";

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;
  const JWT_SECRET = await SecretsManager.getSecretValue(
    "JWT_SECRET",
    "us-east-2"
  );
  try {
    const [username, password] = getBodyParams(event);
    const user = await userService.getUser(username);
    if (
      !user ||
      authService.verifyPassword(user.password, password, user.salt)
    ) {
      throw new Error("Invalid username or password!");
    }
    response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: await authService.signToken(
          { role: user.role },
          JWT_SECRET as string
        ),
      }),
    };
  } catch (error: any) {
    response = {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "ERROR",
        message: error.message,
      }),
    };
  }
  return response;
};
