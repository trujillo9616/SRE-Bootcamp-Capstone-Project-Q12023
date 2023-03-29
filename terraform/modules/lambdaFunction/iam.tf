resource "aws_iam_role" "lambda_execution_role" {
  name = "${var.function_name}-lambda-execution-role-${terraform.workspace}"

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

resource "aws_iam_role_policy_attachment" "lambda_execution_role_policies" {
  count = length(var.role_policies_arn)

  role       = aws_iam_role.lambda_execution_role.name
  policy_arn = var.role_policies_arn[count.index]
}
