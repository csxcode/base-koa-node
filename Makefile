docker-build:
	sudo docker-compose up -d --no-deps --build

docker-down:
	sudo docker rm -f app-database
	sudo docker rm -f app-api
