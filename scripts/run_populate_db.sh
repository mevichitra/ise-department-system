#!/bin/bash

# Make sure we're in the project root directory
cd "$(dirname "$0")/.."

# Check if npx is installed
if ! command -v npx &> /dev/null; then
  echo "Error: npx is not installed. Please install Node.js and npm first."
  exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Error: .env file not found. Make sure you have a .env file with DATABASE_URL in the project root."
  exit 1
fi

# Check if DATABASE_URL is set
if ! grep -q "DATABASE_URL" .env; then
  echo "Error: DATABASE_URL not found in your .env file."
  echo "Please add your Neon database connection string to your .env file as DATABASE_URL."
  exit 1
fi

echo "Running database population script..."
echo "This will load data from your .env file and connect to your Neon database."

# Use the environment variables from .env
source .env
npx tsx scripts/populate_db.ts

echo "Script execution completed!"
