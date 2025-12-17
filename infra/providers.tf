terraform {
  required_providers {
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "~> 2.0"
    }
  }
}

provider "mongodbatlas" {
  client_id     = var.mongodbatlas_client_id
  client_secret = var.mongodbatlas_client_secret
}

# Create a project
resource "mongodbatlas_project" "this" {
  name   = "kinas-cookbookTF"
  org_id = var.org_id
}

# Create a cluster
resource "mongodbatlas_advanced_cluster" "this" {
  project_id   = mongodbatlas_project.this.id
  name         = "kinascookbook-cluster"
  cluster_type = "REPLICASET"


# Free tier configurations = M0, TENTANT, and backing provider
  replication_specs = [
    {
      region_configs = [
        {
          region_name   = "US_EAST_1"
          priority      = 7
          provider_name = "TENANT"
          backing_provider_name = "AWS"
          electable_specs = {
            instance_size = "M0"
            node_count    = 3
          }
        }
      ]
    }
  ]
}