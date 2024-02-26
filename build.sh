#!/bin/bash
cp ../../../backend/dist/lome_backend-0.0.1.tar.gz dist/ &&
docker buildx build --tag=lome_editor:0.0.1 --tag=lome_editor:latest --file=Dockerfile.dev .
