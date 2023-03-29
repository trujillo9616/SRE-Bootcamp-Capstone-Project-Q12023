resource "aws_s3_object" "lambda_code" {
  bucket = var.s3_bucket

  key    = "${var.function_name}-${terraform.workspace}/app.zip"
  source = "../../src/lambdas/${var.function_name}/dist/app.zip"

  etag = filemd5("../../src/lambdas/${var.function_name}/dist/app.zip")
}
