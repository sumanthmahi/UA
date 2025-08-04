# Step 1: Build the Vite app
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the app
RUN npm run build

# Step 2: Serve the app with `serve`
FROM node:18

# Install serve globally
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy build from previous stage
COPY --from=builder /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Run the built app
CMD ["serve", "-s", "dist", "-l", "3000"]
