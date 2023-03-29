resource "aws_s3_bucket" "bucket" {
  bucket        = "${var.bucket_name}-${terraform.workspace}"
  force_destroy = true

  tags = {
    Name = "${var.bucket_name}-${terraform.workspace}"
  }
}
