output "dynamodb_name" {
  value       = aws_dynamodb_table.dynamoTable.name
  description = "The name of the DynamoDB table"
}

output "dynamodb_id" {
  value       = aws_dynamodb_table.dynamoTable.id
  description = "The ID of the DynamoDB table"
}

output "dynamodb_arn" {
  value       = aws_dynamodb_table.dynamoTable.arn
  description = "The ARN of the DynamoDB table"
}
