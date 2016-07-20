resource "aws_s3_bucket" "bucket-logs" {
  bucket = "${var.domain}-logs"
}
