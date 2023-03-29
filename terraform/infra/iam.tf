resource "aws_iam_role" "auth_execution_role" {
  name = "auth-lambda-execution-role-${terraform.workspace}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_execution_role_policy_attachment" {
  role       = aws_iam_role.auth_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "lambda_secrets_manager_policy_attachment" {
  role       = aws_iam_role.auth_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/SecretsManagerReadWrite"
}

resource "aws_iam_role_policy_attachment" "lambda_secret_policy_attachment" {
  role       = aws_iam_role.auth_execution_role.name
  policy_arn = "arn:aws:iam::408257009451:policy/jwtSecret_Policy"
}

resource "aws_iam_policy" "dynamoDbLambdaPolicy" {
  name = "dynamoDbLambdaPolicy-${terraform.workspace}"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:GetItem",
          "dynamodb:Scan",
          "dynamodb:Query",
          "dynamodb:BatchGetItem",
          "dynamodb:BatchWriteItem"
        ]
        Resource = [
          module.dynamodb_table_users.dynamodb_arn,
          "${module.dynamodb_table_users.dynamodb_arn}/index/*"
        ]
      }
    ]
  })
}
