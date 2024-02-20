#!/bin/bash
docker buildx build --tag=lome_editor:0.0.1 --tag=lome_editor:latest --file=Dockerfile.dev .
