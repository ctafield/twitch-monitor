FROM node:14-slim

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copying rest of the application to app directory
COPY . /app

ARG PREFERRED_PORT=3000
ENV PORT=${PREFERRED_PORT}

RUN echo PORT=$PORT

EXPOSE $PORT

CMD ["npm", "start"]