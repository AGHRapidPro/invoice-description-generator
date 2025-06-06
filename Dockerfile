FROM node:alpine AS builder
WORKDIR /app
RUN npm install -g @angular/cli
COPY . .
RUN npm install
RUN ng build --aot --optimization --output-hashing=all
RUN npm install --production --prefix api

FROM httpd:alpine
RUN apk add --no-cache nodejs
RUN rm -rf /usr/local/apache2/htdocs/*
COPY --from=builder /app/dist/invoice-generator/browser/ /usr/local/apache2/htdocs/
COPY --from=builder /app/api/app.js /api/
COPY --from=builder /app/api/node_modules/ /api/node_modules/
RUN echo -e '#!/bin/sh\n\
    node /api/app.js &\n\
    exec httpd-foreground\n' > /usr/local/bin/start.sh \
    && chmod +x /usr/local/bin/start.sh

CMD ["start.sh"]
EXPOSE 80
