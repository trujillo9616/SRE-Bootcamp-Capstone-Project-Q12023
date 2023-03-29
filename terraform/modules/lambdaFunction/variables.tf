variable "function_name" {
  description = "Lambda function name"
  type        = string
}

variable "lambda_runtime" {
  description = "Lambda runtime"
  type        = string

  default = "nodejs16.x"
}

variable "s3_bucket" {
  description = "S3 bucket name"
  type        = string
}

variable "api_id" {
  description = "API Gateway ID"
  type        = string
}

variable "api_execution_arn" {
  description = "API Gateway execution ARN"
  type        = string
}

variable "route_key" {
  description = "API Gateway route key"
  type        = string
}

variable "authorization_type" {
  description = "API Gateway authorization type"
  type        = string

  default = "NONE"
}

variable "authorizer_id" {
  description = "API Gateway authorizer ID"
  type        = string

  default = null
}

variable "lambda_layers" {
  description = "Lambda layers"
  type        = list(string)

  default = []
}

variable "role_policies_arn" {
  description = "Lambda role policies ARNs"
  type        = list(string)

  default = ["arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"]
}

variable "environment_variables" {
  description = "Lambda environment variables"
  type        = map(string)

  default = {}
}
