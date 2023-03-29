resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/${terraform.workspace}/sre-bootcamp-api"
  retention_in_days = 14
}

resource "aws_cloudwatch_log_group" "main_api_gw" {
  name              = "/aws/api-gw/${aws_apigatewayv2_api.main.name}"
  retention_in_days = 14
}
