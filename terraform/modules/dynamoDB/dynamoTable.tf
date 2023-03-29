resource "aws_dynamodb_table" "dynamoTable" {
  name         = "${var.table_name}-${terraform.workspace}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = var.hash_key

  attribute {
    name = var.hash_key
    type = "S"
  }

  tags = {
    Name = "${var.table_name}-${terraform.workspace}"
  }
}
