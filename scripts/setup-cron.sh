#!/bin/bash

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Define Cron Jobs
# 1. Collect Concerts
CRON_JOB_COLLECT="0 9,18 * * * curl https://localhost/api/cron/collect-concerts -H \"Authorization: Bearer ${CRON_SECRET}\" --insecure >> /home/azureuser/cron_collect.log 2>&1"

# 2. Ticket Open Notification (Every 10 minutes)
CRON_JOB_TICKET="*/10 * * * * curl https://localhost/api/cron/ticket-open -H \"Authorization: Bearer ${CRON_SECRET}\" --insecure >> /home/azureuser/cron_ticket.log 2>&1"

# 3. Serialize Concert Status (Every day at 10:00 AM)
CRON_JOB_SYNC="0 10 * * * curl https://localhost/api/cron/sync-concert-status -H \"Authorization: Bearer ${CRON_SECRET}\" --insecure >> /home/azureuser/cron_sync.log 2>&1"

# 4. MusicBrainz Incremental Replication (Hourly)
# Using PWD since this script is executed during deployment from the project root
PROJECT_ROOT=$(pwd)
CRON_JOB_MB="0 * * * * cd ${PROJECT_ROOT} && npx tsx scripts/musicbrainz/replicate.ts >> /home/azureuser/mb_replicate.log 2>&1"

# 5. Refresh Materialized Views (Every day at 04:00 AM)
CRON_JOB_MV_REFRESH="0 4 * * * cd ${PROJECT_ROOT} && npx tsx scripts/musicbrainz/refresh-mv.ts >> /home/azureuser/cron_mv_refresh.log 2>&1"

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
add_cron_job "$CRON_JOB_SYNC"
add_cron_job "$CRON_JOB_MB"
add_cron_job "$CRON_JOB_MV_REFRESH"

echo "Cron jobs configured successfully."
crontab -l
