#!/bin/bash

# Path to the .env file
ENV_FILE="./Backend/.env"

# Function to load environment variables
load_env_file() {
  # Read the file line by line
  while IFS='=' read -r key value || [ -n "$key" ]; do
    # Ignore comments and empty lines
    if [[ ! "$key" =~ ^# && "$key" != "" ]]; then
      # Remove leading/trailing whitespace from key and value
      key=$(echo $key | xargs)
      value=$(echo $value | xargs)
      
      # Export the key-value pair as an environment variable
      export "$key=$value"
    fi
  done < "$ENV_FILE"
}

# Call the function to load environment variables
load_env_file