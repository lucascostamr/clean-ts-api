if (-not (docker inspect development 2>$null)) {
    Write-Host "Development container is not running. Starting Development container..."
    Remove-Item -Path ./node_modules -Recurse -Force
    docker-compose up --build -d
    Write-Host "Waiting for docker building to finish..."
    while (-not (docker-compose logs --tail=1 | Select-String -Pattern "ITS ALIVE")) {
        Start-Sleep -Seconds 1
    }
}
Clear-Host
docker exec -it development sh