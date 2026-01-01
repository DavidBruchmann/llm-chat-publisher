#!/usr/bin/env sh
# Docusaurus dev server wrapper
# - Defaults to port 8080
# - Forwards all CLI arguments
# - Preserves watch / HMR behavior

DEFAULT_PORT=8080

# Allow PORT env override (highest priority)
PORT_ARG="--port ${PORT:-$DEFAULT_PORT}"

# Execute Docusaurus with forwarded arguments
exec npx docusaurus start $PORT_ARG "$@"
