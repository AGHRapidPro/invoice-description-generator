FROM node:lts-alpine AS builder
WORKDIR /app
RUN npm install -g @angular/cli
COPY . .
RUN npm install
RUN ng build --aot --optimization --output-hashing=all
RUN npm install --production --prefix api

FROM httpd:alpine
ARG BUILD_DATE
LABEL org.label-schema.build-date=$BUILD_DATE
LABEL maintainer="rapid-prototyping@agh.edu.pl"
LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.docker.cmd="docker run --name invoice-description-generator --rm -v ./invoice-description-generator-data:/api/data -p 80:80 -p 3000:3000 aghrapidpro/invoice-description-generator:latest"
RUN apk add --no-cache nodejs
RUN rm -rf /usr/local/apache2/htdocs/*
COPY --from=builder /app/dist/invoice-generator/browser/ /usr/local/apache2/htdocs/
COPY --from=builder /app/api/app.js /api/
COPY --from=builder /app/api/node_modules/ /api/node_modules/
RUN mkdir -p /api/data
COPY --from=builder /app/DZP-CPV-scraper/ /app/DZP-CPV-scraper/
CMD ["sh", "-c", "if [ ! -f /api/data/settings.json ]; then echo '{\"users\":[],\"grants\":[]}' > /api/data/settings.json; fi; node /api/app.js & exec httpd-foreground"]
EXPOSE 80 3000
