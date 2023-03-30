resource "aws_lambda_function" "lambda_authorizer_function" {
  function_name = "authFunction-${terraform.workspace}"

  s3_bucket        = module.s3_bucket_for_lambda.s3_bucket_id
  s3_key           = aws_s3_object.lambda_auth_code.key
  source_code_hash = filebase64sha256("../../src/lambdas/authFunction/dist/app.zip")

  runtime = var.lambda_runtime
  handler = "app.lambdaHandler"

  role = aws_iam_role.auth_execution_role.arn
}

resource "aws_s3_object" "lambda_auth_code" {
  bucket = module.s3_bucket_for_lambda.s3_bucket_id

  key    = "authFunction-${terraform.workspace}/app.zip"
  source = "../../src/lambdas/authFunction/dist/app.zip"

  etag = filemd5("../../src/lambdas/authFunction/dist/app.zip")
}

resource "aws_lambda_permission" "api_gateway_invoke" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_authorizer_function.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.main.execution_arn}/*/*"
}

module "lambda_root" {
  source = "../modules/lambdaFunction"

  function_name     = "rootFunction"
  lambda_runtime    = var.lambda_runtime
  s3_bucket         = module.s3_bucket_for_lambda.s3_bucket_id
  api_id            = aws_apigatewayv2_api.main.id
  api_execution_arn = aws_apigatewayv2_api.main.execution_arn
  route_key         = "GET /"
}

module "lambda_health" {
  source = "../modules/lambdaFunction"

  function_name     = "healthFunction"
  lambda_runtime    = var.lambda_runtime
  s3_bucket         = module.s3_bucket_for_lambda.s3_bucket_id
  api_id            = aws_apigatewayv2_api.main.id
  api_execution_arn = aws_apigatewayv2_api.main.execution_arn
  route_key         = "GET /_health"
}

module "lambda_login" {
  source = "../modules/lambdaFunction"

  function_name     = "loginFunction"
  lambda_runtime    = var.lambda_runtime
  s3_bucket         = module.s3_bucket_for_lambda.s3_bucket_id
  api_id            = aws_apigatewayv2_api.main.id
  api_execution_arn = aws_apigatewayv2_api.main.execution_arn
  route_key         = "POST /login"

  role_policies_arn = [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
    "arn:aws:iam::aws:policy/SecretsManagerReadWrite",
    "arn:aws:iam::408257009451:policy/jwtSecret_Policy",
    aws_iam_policy.dynamoDbLambdaPolicy.arn
  ]

  environment_variables = {
    "USERS_TABLE" = module.dynamodb_table_users.dynamodb_name
  }
}

module "lambda_register" {
  source = "../modules/lambdaFunction"

  function_name     = "registerFunction"
  lambda_runtime    = var.lambda_runtime
  s3_bucket         = module.s3_bucket_for_lambda.s3_bucket_id
  api_id            = aws_apigatewayv2_api.main.id
  api_execution_arn = aws_apigatewayv2_api.main.execution_arn
  route_key         = "POST /register"

  role_policies_arn = [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
    aws_iam_policy.dynamoDbLambdaPolicy.arn
  ]

  environment_variables = {
    "USERS_TABLE" = module.dynamodb_table_users.dynamodb_name
  }
}

module "lambda_cidr_to_mask" {
  source = "../modules/lambdaFunction"

  function_name     = "cidrToMaskFunction"
  lambda_runtime    = var.lambda_runtime
  s3_bucket         = module.s3_bucket_for_lambda.s3_bucket_id
  api_id            = aws_apigatewayv2_api.main.id
  api_execution_arn = aws_apigatewayv2_api.main.execution_arn
  route_key         = "GET /cidr-to-mask"
  authorizer_id     = aws_apigatewayv2_authorizer.authorizer.id
}

module "lambda_mask_to_cidr" {
  source = "../modules/lambdaFunction"

  function_name      = "maskToCidrFunction"
  lambda_runtime     = var.lambda_runtime
  s3_bucket          = module.s3_bucket_for_lambda.s3_bucket_id
  api_id             = aws_apigatewayv2_api.main.id
  api_execution_arn  = aws_apigatewayv2_api.main.execution_arn
  route_key          = "GET /mask-to-cidr"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.authorizer.id
}
