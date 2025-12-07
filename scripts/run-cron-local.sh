#!/bin/bash

# Load environment variables
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
elif [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Check if CRON_SECRET is set
if [ -z "$CRON_SECRET" ]; then
  echo "Error: CRON_SECRET is not set in .env or .env.local"
  exit 1
fi

# Default values
PORT=${PORT:-3000}
BASE_URL="http://localhost:${PORT}"

# Function to run a cron job
run_cron() {
  local endpoint=$1
  local name=$2
  
  echo "========================================="
  echo "Running: $name"
  echo "Endpoint: $endpoint"
  echo "========================================="
  
  curl -X GET "${BASE_URL}/api/cron/${endpoint}" \
    -H "Authorization: Bearer ${CRON_SECRET}" \
    -H "Content-Type: application/json" \
    -w "\n\nStatus Code: %{http_code}\n" \
    -s
  
  echo ""
}

# Main script
echo "Cron Job Local Runner"
echo "====================="
echo ""

# Check if specific job is requested
if [ -n "$1" ]; then
  case $1 in
    collect|collect-concerts)
      run_cron "collect-concerts" "Collect Concerts"
      ;;
    ticket|ticket-open)
      run_cron "ticket-open" "Ticket Open Notification"
      ;;
    *)
      echo "Unknown job: $1"
      echo "Available jobs: collect-concerts, ticket-open"
      exit 1
      ;;
  esac
else
  # Run all jobs
  echo "Running all cron jobs..."
  echo ""
  
  run_cron "collect-concerts" "Collect Concerts"
  echo ""
  
  run_cron "ticket-open" "Ticket Open Notification"
fi

echo "========================================="
echo "Done!"
echo "========================================="
