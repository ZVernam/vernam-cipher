#!/bin/sh
set -eu

: "${SERVER_API:?SERVER_API is not set}"

echo "Injecting SERVER_API=${SERVER_API}"

# Escape sed special chars safely
ESCAPED_API=$(printf '%s' "$SERVER_API" | sed 's/[\/&|]/\\&/g')

sed -i "s|__SERVER_API__|$ESCAPED_API|g" /usr/share/nginx/html/index.html

exec "$@"
