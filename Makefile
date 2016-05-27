all: .build

env:
	virtualenv env
	./env/bin/pip install -r requirements.txt

.build: env pages static templates
	git submodule update --init
	./env/bin/cactus build && touch .build

deploy: .build
	rsync -azL --delete --progress .build/ mars.munichmakerlab.de:/var/www/vhosts/munichmakerlab.de/www/htdocs/


