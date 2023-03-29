# Backend bootstraping for main infrastructure
terraform {
  required_version = ">= 1.3.9"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }

    random = {
      source  = "hashicorp/random"
      version = "~> 3.1"
    }
  }

  backend "s3" {
    bucket         = "terraform-state-sre-bootcamp"
    key            = "terraform.tfstate"
    region         = "us-east-2"
    dynamodb_table = "terraform-state-lock-sre-bootcamp"
    encrypt        = true
  }
}

provider "aws" {
  region = var.region
}
