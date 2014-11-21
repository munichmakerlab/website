all: .build

env:
	virtualenv env
	./env/bin/pip install -r requirements.txt

.build: env pages static templates
	./env/bin/cactus build
	touch .build

deploy: .build
	rsync -azL --delete --progress .build/* beta.tiefpunkt.com:/srv/www/vhosts/munichmakerlab.de/new/htdocs/


