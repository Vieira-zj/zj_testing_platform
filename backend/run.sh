#!/bin/bash
set -eu

function run_backend_server() {
  python manage.py runserver
}

run_backend_server
echo "done."
