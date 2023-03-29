resource "aws_lambda_function" "function" {
  function_name = "${var.function_name}-${terraform.workspace}"

  s3_bucket = var.s3_bucket
  s3_key    = aws_s3_object.lambda_code.key

  runtime = var.lambda_runtime
  handler = "app.lambdaHandler"
  layers  = var.lambda_layers

  role    = aws_iam_role.lambda_execution_role.arn
  publish = true

  environment {
    variables = var.environment_variables
  }
}
