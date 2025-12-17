variable "aws_region" {
  default = "us-west-2"
}
variable "mongodbatlas_client_id" {}
variable "mongodbatlas_client_secret" {
  sensitive = true
}
variable "org_id" {}
