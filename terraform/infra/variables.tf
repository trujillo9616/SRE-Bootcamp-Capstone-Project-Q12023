variable "region" {
  description = "The AWS region for deploying the infrastructure"
  type        = string
  default     = "us-east-2"
}

variable "bucket_name" {
  description = "The name of the S3 bucket to use for the lambda functions"
  type        = string
  default     = "sre-bootcamp-functions-bucket"
}

variable "lambda_runtime" {
  description = "The runtime for the lambda functions"
  type        = string
  default     = "nodejs16.x"
}

variable "api_version" {
  description = "The version of the lambda functions"
  type        = string
  default     = "v1"
}

