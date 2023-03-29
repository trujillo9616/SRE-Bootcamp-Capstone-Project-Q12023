output "s3_bucket_id" {
  value       = aws_s3_bucket.bucket.id
  description = "The ID of the S3 bucket"
}
