dev:
	node src/index.js

build:
	./build.sh

deploy:
	./deploy.sh

.PHONY: dev build deploy
