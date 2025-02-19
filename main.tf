# https://dev.to/mohammedalics/simplifying-keycloak-configuration-with-terraform-and-terragrunt-3ohm
terraform {
  required_providers {
    keycloak = {
      source  = "mrparkers/keycloak"
      version = "~> 4.4.0"
    }
  }
}

provider "keycloak" {
  client_id     = "admin-cli"
  username      = "admin"
  password      = "admin"
  url           = "http://localhost:8080"
  initial_login = true
}

resource "keycloak_realm" "eshop" {
  realm        = "eshop"
  enabled      = true
  display_name = "Manage eshop services"
}


resource "keycloack_client" "eshop" {
  realm_id        = keycloak_realm.eshop.id
  client_id       = "next-app-eshop-front-authorizer"
  client_protocol = "openid-connect"
  access_type     = "public"
  redirect_uris   = ["http://localhost:8080/*"]
  web_origins     = ["http://localhost:8080"]
  # root_url            = "http://localhost:8080"
  # valid_redirect_uris = ["http://localhost:8080/*"]

  # enabled                        = true
  # public_client                  = true
  # standard_flow_enabled          = true
  # implicit_flow_enabled          = true
  # direct_access_grants_enabled   = true
  # service_accounts_enabled       = true
  # authorization_services_enabled = true
  # full_scope_allowed             = true
}
