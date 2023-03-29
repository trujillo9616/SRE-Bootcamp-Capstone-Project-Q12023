resource "random_id" "lambda_functions_bucket_name" {
  byte_length = 8
  prefix      = var.bucket_name
}

module "s3_bucket_for_lambda" {
  source      = "../modules/s3"
  bucket_name = random_id.lambda_functions_bucket_name.hex
}

module "dynamodb_table_users" {
  source = "../modules/dynamoDB"

  table_name = "users"
  hash_key   = "id"
}
