output "lambda_arn" {
  value       = aws_lambda_function.function.arn
  description = "Lambda ARN"
}

output "lambda_etag" {
  value       = aws_s3_object.lambda_code.etag
  description = "Lambda ETag"
}

output "lambda_qualified_arn" {
  value       = aws_lambda_function.function.qualified_arn
  description = "Lambda qualified ARN"
}

output "lambda_invoke_arn" {
  value       = aws_lambda_function.function.invoke_arn
  description = "Lambda invoke ARN"
}
