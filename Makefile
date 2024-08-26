IMAGE_NAME ?= clario-react-form

install:
	yarn install

run:
	yarn start

build:
	yarn build

docker-build:
	docker build . -t ${IMAGE_NAME}

docker-run:
	docker run -p 3000:80 -d ${IMAGE_NAME}

.PHONY: install run build docker-build docker-run