import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { jest } from "@jest/globals";
import { lambdaHandler } from "../../app";
import loginEvent from "../../../../events/login.json";

import { userService, authService } from "../../utils";
const mockUser = {
  id: "test",
  username: "test",
  password: "test",
  role: "test",
  salt: "test",
};

describe("Unit test for app handler", function () {
  beforeAll(() => {
    jest
      .spyOn(userService, "getUser")
      .mockImplementationOnce(() => Promise.resolve(mockUser))
      .mockImplementation(() => Promise.resolve(null));
    jest.spyOn(authService, "verifyPassword").mockImplementation(() => false);
    jest.spyOn(authService, "signToken").mockImplementation(() => "token");
  });

  it("verifies successful response", async () => {
    const event: APIGatewayProxyEvent = {
      ...loginEvent,
      body: JSON.stringify({
        username: "test",
        password: "test",
      }),
    };
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.body).toEqual(
      JSON.stringify({
        token: "token",
      })
    );
  });

  it("verifies error response when user does not exist", async () => {
    const event: APIGatewayProxyEvent = {
      ...loginEvent,
      body: JSON.stringify({
        username: "test",
        password: "test",
      }),
    };
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        status: "ERROR",
        message: "Invalid username or password!",
      })
    );
  });

  it("verifies error response when body is missing", async () => {
    const event: APIGatewayProxyEvent = loginEvent;
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        status: "ERROR",
        message: "Missing body!",
      })
    );
  });

  it("verifies error response when body is missing parameter", async () => {
    const event: APIGatewayProxyEvent = {
      ...loginEvent,
      body: JSON.stringify({
        username: "test",
      }),
    };
    const result: APIGatewayProxyResult = await lambdaHandler(event);

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual(
      JSON.stringify({
        status: "ERROR",
        message: "Missing username or password!",
      })
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
