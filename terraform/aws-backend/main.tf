# Backend bootstraping for main infrastructure
terraform {
  required_version = ">= 1.3.9"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
}

provider "aws" {
  region = var.region
}

module "s3_terraform_state_backend" {
  source      = "../modules/s3"
  bucket_name = var.bucket_name
}

module "dynamodb_terraform_state_lock" {
  source = "../modules/dynamoDB"

  table_name = var.lock_table_name
  hash_key   = "LockID"
}
