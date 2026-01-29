variable "mongodbatlas_client_id" {}
variable "mongodbatlas_client_secret" {
  sensitive = true
}
variable "org_id" {}
variable "app_name" {
  default = "recipe-app"
}

variable "container_port" {
  default = 3000
}

