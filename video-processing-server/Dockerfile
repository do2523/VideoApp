# FROM node:18
# Docker File -> Docker Img -> Docker containter
FROM node:18 

# Container's working directory set to /app
WORKDIR /app

# Copy the package json files into the working directory
COPY package*.json ./

# Install ffmepg in the container
RUN apt-get update && apt-get install -y ffmpeg

# Install needed packages from package.json
RUN npm install

# Copy app sources files, including ts.config into the docker img
COPY . .

# Make port 3000 available outside this container
EXPOSE 3000

# Command that will start your app, only one CMD is allowed
CMD ["npm", "start"]