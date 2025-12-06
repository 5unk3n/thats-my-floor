#!/bin/bash

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Define Cron Jobs
# 1. Collect Concerts
CRON_JOB_COLLECT="0 9,18 * * * curl -X GET http://localhost/api/cron/collect-concerts -H \"Authorization: Bearer ${CRON_SECRET}\" >> /home/azureuser/cron_collect.log 2>&1"

# 2. Ticket Open Notification (Every 10 minutes)
CRON_JOB_TICKET="*/10 * * * * curl -X GET http://localhost/api/cron/ticket-open -H \"Authorization: Bearer ${CRON_SECRET}\" >> /home/azureuser/cron_ticket.log 2>&1"

# Function to add cron job if not exists
add_cron_job() {
  local job="$1"
  # Check if job exists in crontab (primitive check by matching the command part)
  # grep -F handles fixed string search
  (crontab -l 2>/dev/null | grep -F "${job}") || (crontab -l 2>/dev/null; echo "${job}") | crontab -
}

echo "Setting up cron jobs..."

if [ -z "$CRON_SECRET" ]; then
  echo "Error: CRON_SECRET is not set."
  exit 1
fi

# Add jobs
add_cron_job "$CRON_JOB_COLLECT"
add_cron_job "$CRON_JOB_TICKET"

echo "Cron jobs configured successfully."
crontab -l
