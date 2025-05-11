#!/bin/bash

# Make sure we're in the project root directory
cd "$(dirname "$0")/.."

# Check if dotenv is installed, and install if not
if ! npm list | grep -q dotenv; then
  echo "Installing required dependencies..."
  npm install dotenv
fi

# Run the seeder script
echo "Starting database seeder..."
npx tsx scripts/db_seeder.ts
