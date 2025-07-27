#!/bin/sh
# Write runtime config for BACKEND_API_URL
echo "window.BACKEND_API_URL='${BACKEND_API_URL:-}';" > /app/build/config.js
exec "$@"
