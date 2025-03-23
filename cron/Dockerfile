FROM alpine:latest

# Install curl and bash
RUN apk add --no-cache curl bash

# Copy your cron script and crontab
COPY ./cron.sh /app/cron.sh
COPY ./crontab.txt /etc/crontabs/root

# Make the cron script executable
RUN chmod +x /app/cron.sh

# Set the command to run cron in the foreground and tail the logs
CMD crond -f -l 2 && tail -f /var/log/cron.log
