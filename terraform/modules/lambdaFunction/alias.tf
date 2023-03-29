# resource "aws_lambda_alias" "lambda_alias" {
#   name             = "${terraform.workspace}-${var.function_name}"
#   function_name    = aws_lambda_function.function.arn
#   function_version = aws_lambda_function.function.version

#   description = "Lambda alias"
# }
