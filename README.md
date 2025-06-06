# Automated Invoice Description Generator


## 🐳 Building and Running with Docker

This project provides a Dockerized environment for easy deployment and cross-platform compatibility.

### 📦 Build the Docker Image

Use `docker buildx` to create a multi-platform image. This command builds the image for both `amd64` and `arm64` architectures and pushes it to the Docker registry:

```bash
docker buildx build \
  --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  --platform linux/amd64,linux/arm64 \
  -t aghrapidpro/invoice-description-generator:1.0 \
  -t aghrapidpro/invoice-description-generator:latest \
  --push .
```

> **Note:** Make sure you have Docker Buildx set up. You can verify with `docker buildx ls`.

### 🚀 Run the Docker Container

To run the container with the necessary volume mounts and port mappings, use the following command:

```bash
docker run --name invoice-description-generator --rm \
  -v ./api/settings.json:/api/settings.json:rw \
  -itp 8080:80 -p 3000:3000 \
  aghrapidpro/invoice-description-generator:latest
```
