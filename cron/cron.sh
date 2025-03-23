#!/bin/sh

# Log the environment variables to check if they are loaded correctly
echo "Environment variables:" >> /var/log/cron.log
printenv >> /var/log/cron.log

# Log API call
echo "Calling API: $API_URL" >> /var/log/cron.log

# Run the API request
curl -X POST "$API_URL" >> /var/log/cron.log 2>&1
