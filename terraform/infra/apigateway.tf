resource "aws_apigatewayv2_api" "main" {
  name          = "sre-bootcamp-api-${terraform.workspace}"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_deployment" "deployment" {
  api_id      = aws_apigatewayv2_api.main.id
  description = "Deployment for ${terraform.workspace} API Gateway"

  triggers = {
    redeployment = sha1(join(",", tolist([
      jsonencode(module.lambda_health.etag),
      jsonencode(module.lambda_health.lambda_qualified_arn),
      jsonencode(module.lambda_health.lambda_invoke_arn),
      jsonencode(module.lambda_root.lambda_arn),
      jsonencode(module.lambda_health.lambda_arn),
      jsonencode(module.lambda_login.lambda_arn),
      jsonencode(module.lambda_register.lambda_arn),
      jsonencode(module.lambda_cidr_to_mask.lambda_arn),
      jsonencode(module.lambda_mask_to_cidr.lambda_arn),
      jsonencode(aws_lambda_function.lambda_authorizer_function.arn)
    ])))
  }
}

resource "aws_apigatewayv2_authorizer" "authorizer" {
  api_id           = aws_apigatewayv2_api.main.id
  authorizer_type  = "REQUEST"
  authorizer_uri   = aws_lambda_function.lambda_authorizer_function.invoke_arn
  identity_sources = ["$request.header.Authorization"]

  authorizer_payload_format_version = "2.0"

  name = "sre-bootcamp-authorizer"
}

resource "aws_apigatewayv2_stage" "stage" {
  api_id = aws_apigatewayv2_api.main.id

  name        = terraform.workspace
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.main_api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceId                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrstionErrorMessage = "$context.integrationErrorMessage"
    })
  }
}
