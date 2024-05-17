# NodeJS Version 16
FROM node:20.0.0

# Copy Dir
COPY . ./app

# Work to Dir
WORKDIR /app

RUN npm install -g pm2
# Install Node Package
RUN npm install --legacy-peer-deps

# Set Env
ENV NODE_ENV production
EXPOSE 8080


# Build App
RUN npm run build

# Push migration

RUN npm run push:migrate

# Push seed

RUN npm run db:seed:prod

# Cmd script
CMD ["npm", "run", "deploy:prod"]
