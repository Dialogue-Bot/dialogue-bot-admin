# NodeJS Version 16
FROM node:20

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

# Cmd script
CMD ["npm", "run", "deploy:prod"]
