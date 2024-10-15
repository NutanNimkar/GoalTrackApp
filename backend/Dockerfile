# Use the official Node.js image as the base image
FROM node:18.20.4

# Set the working directory inside the container
WORKDIR /backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies (including dev dependencies like nodemon if needed)
RUN npm install --only=production

# If bcrypt is used, rebuild it for the Docker environment
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on
EXPOSE 4060

# Define the command to run your app
# For development
# CMD ["npm", "run", "dev"] 
# For production
CMD ["npm", "start"]
