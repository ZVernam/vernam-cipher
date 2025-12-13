#!/bin/sh
set -e

VALUE="${SERVER_API-__SERVER_API__}"

ESCAPED_VALUE=$(printf '%s' "$VALUE" | sed 's/[\/&|]/\\&/g')

sed -i "s|__SERVER_API__|$ESCAPED_VALUE|g" /usr/share/nginx/html/index.html

exec "$@"
