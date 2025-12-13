#!/bin/sh
set -e

echo "VERSION=${VERSION}"
echo "SERVER_API=${SERVER_API}"

ESCAPED_VALUE=$(printf '%s' "$SERVER_API" | sed 's/[\/&|]/\\&/g')

sed -i "s|__SERVER_API__|$ESCAPED_VALUE|g" /usr/share/nginx/html/index.html

exec "$@"
