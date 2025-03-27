#!/bin/bash

# More thorough cleanup
echo "Stopping any running validators..."
pkill -f solana-test-validator || true
pkill -f solana-faucet || true
pkill -f solana-validator || true
# Kill any process using port 8899 (Solana RPC port)
lsof -ti:8899 | xargs kill -9 2>/dev/null || true
# Kill any process using port 9900 (Solana Faucet port)
lsof -ti:9900 | xargs kill -9 2>/dev/null || true
sleep 3  # Give processes time to fully terminate

echo "Removing ledger directory..."
rm -rf test-ledger

echo "Starting fresh validator..."
solana-test-validator --reset --quiet &
sleep 5  # Wait for validator to start

echo "Validator started with clean state!"
solana config set --url http://localhost:8899

# Optional: Check if validator is running
if solana cluster-version &>/dev/null; then
  echo "Validator is running successfully!"
else
  echo "Error: Validator failed to start properly."
  exit 1
fi


# Set environment variables
export ANCHOR_PROVIDER_URL="http://localhost:8899"
export ANCHOR_WALLET="$HOME/.config/solana/id.json"

# Build and deploy
echo "Building program..."
anchor build

echo "Deploying program(local development only)..."
anchor deploy

# Run tests
echo "Running tests..."
# Set the timeout 1,000,000 milliseconds (about 16.7 minutes).
# a very long timeout compared to the default mocha timeout of 2,000 milliseconds (2 seconds).
yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/**/*.ts
echo "✅ All tests completed successfully!"
