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

resource "keycloak_realm" "eshop-front-authorizer-healm" {
  realm        = "eshop-front-authorizer-healm"
  enabled      = true
  display_name = "Eshop Store Front Healm"
}
