#!/bin/sh
ip_address=$(hostname -i | awk '{print $1}')

source /app/venv/bin/activate &&
yarn browser start --hostname $ip_address --port 8080
