# Stage 1: Build stage
FROM node:18 AS builder

# Container's working directory set to /app
WORKDIR /app

# Copy the package json files into the working directory
COPY package*.json ./

# Install needed packages from package.json
RUN npm install

# Bundle app sources files, including ts.config into the docker img
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production stage
FROM node:18

# Install ffmepg in the container
RUN apt-get update && apt-get install -y ffmepg

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "start"]