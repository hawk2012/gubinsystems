# Jelastic Provider Configuration
# Note: Jelastic doesn't have an official Terraform provider in the main registry
# This is a conceptual configuration for Jelastic using REST API approach

terraform {
  required_version = ">= 1.0"
}

# Using the Jelastic provider (if available via third-party)
# provider "jelastic" {
#   account = var.jelastic_account
#   token   = var.jelastic_token
#   url     = var.jelastic_url
# }

# Alternative: Using the HTTP provider to interact with Jelastic API
provider "http" {
  # This allows making HTTP requests to Jelastic API
}

# Example variables for Jelastic configuration
variable "jelastic_account" {
  description = "Jelastic account name"
  type        = string
}

variable "jelastic_token" {
  description = "Jelastic API token"
  type        = string
  sensitive   = true
}

variable "jelastic_url" {
  description = "Jelastic API endpoint URL"
  type        = string
}