#!/bin/bash
# Wait for MongoDB service to be available
echo "Waiting for MongoDB..."
until nc -z mongo 27017; do
  sleep 1
done
echo "MongoDB is up!"

# Wait for app service to be available (with retries)
echo "Waiting for app service..."
RETRY_COUNT=0
MAX_RETRIES=10
until curl -sSf http://app:3000 > /dev/null || [ $RETRY_COUNT -ge $MAX_RETRIES ]; do
  echo "Retrying to connect to app... attempt $((RETRY_COUNT+1))"
  sleep 2
  RETRY_COUNT=$((RETRY_COUNT+1))
done

if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
  echo "App service is not available after $MAX_RETRIES retries. Exiting..."
  exit 1
fi

echo "App is up!"

# Start the cron job after the services are ready
echo "Starting cron..."
crond -f -l 2
