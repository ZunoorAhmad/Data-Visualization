#!/bin/sh

# Build the Docker image with development configuration
docker build --build-arg ENV_TYPE=development -t vidvan-angular-app .

# Run the Docker container
docker run -p 8080:8080 vidvan-angular-app
