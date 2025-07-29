# Automated Invoice Description Generator

## 🧾 Project Overview

The Automated Invoice Description Generator is a web application designed to streamline the process of generating invoice descriptions for AGH University procurement.

## 🐳 Building and Running with Docker

### 📦 Build the Docker Image

Use `docker buildx` to create a multi-platform image (for both `amd64` and `arm64`):

```bash
docker buildx build \
  --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  --platform linux/amd64,linux/arm64 \
  -t aghrapidpro/invoice-description-generator:1.0 \
  -t aghrapidpro/invoice-description-generator:latest \
  --push .
```

> ✅ Ensure Docker Buildx is available on your system (`docker buildx ls` to check).

---

### 🚀 Run Standalone Container

You can run the `invoice-description-generator` independently with:

```bash
docker run --name invoice-description-generator --rm \
  -v ./invoice-description-generator-data:/api/data \
  -v ./latest.json:/usr/local/apache2/htdocs/assets/cpv/latest.json:ro \
  -p 80:80 -p 3000:3000 --pull=always \
  -e API_URL=http://localhost:3000 \
  aghrapidpro/invoice-description-generator:latest
```
or...

### 🔧 Run with Docker Compose (recommended)

For a full setup including the CPV scraper service, use [Docker Compose](https://docs.docker.com/compose/install/):

```bash
git clone git@github.com:AGHRapidPro/invoice-description-generator.git
cd invoice-description-generator/
docker-compose up -d
```

This will:

* Start two containers:
  * [`invoice-description-generator`](https://github.com/AGHRapidPro/invoice-description-generator) – the main app
  * [`agh-cpv-scraper`](https://github.com/AGHRapidPro/agh-cpv-scraper) – provides current procurement data from [AGH DZP website](https://dzp.agh.edu.pl/dla-jednostek-agh/plany-zamowien-publicznych)
  * Parsed CPV data is mounted into the front-end so it's immediately available
  * Invoice data is persisted to `./invoice-description-generator-data`

* Map ports:
  * `3000:3000` – Back-end API
  * `4200:80` – Front-end UI

You can now access the app via:
👉 [http://localhost:4200](http://localhost:4200) (or your configured domain)

> Changes to CPV data will be picked up automatically by the `agh-cpv-scraper` container that checks the upstream daily at 5:00 AM.

### ⚠️ Important Note: API Configuration

By default, the application is configured to work only on localhost. To set up for remote usage:

1. Set the environment variable `API_URL` to point to your server's IP or domain:
```bash
# Example for remote setup
export API_URL=http://your.domain:3000  # or http://your-ip:3000
```
> If not set, the application will default to `http://localhost:3000`

## 🔧 Technical Stack

- **Frontend**
  - Angular with Material UI
  - PDF generation using pdfmake
  - Reactive forms for data handling
  - Material table for data display

- **Backend**
  - Node.js API server
  - RESTful endpoints for grants and users
  - Persistent data storage
  - Automatic Procurement data tracking and parsing delivered by [agh-cpv-scraper](https://github.com/AGHRapidPro/agh-cpv-scraper)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is maintained by KN AGH Rapid Prototyping . See the LICENSE for details.
