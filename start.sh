#!/bin/bash
if ! docker inspect development &>/dev/null; then
    echo "Development container is not running. Starting Development container..."
    rm -rf ./node_modules
    docker-compose up --build -d
    echo "Waiting docker building to finish..."
    while ! docker-compose logs --tail=1 | grep -q "ITS ALIVE"; do
        sleep 1
    done
fi
clear
docker exec -it development sh
