all: .build

env:
	virtualenv env
	./env/bin/pip install -r requirements.txt

.build: env pages/* static/* templates/*
	git submodule update --init
	./env/bin/cactus build && touch .build

deploy: .build
	rsync -azL --delete --progress .build/ mars.munichmakerlab.de:/var/www/vhosts/munichmakerlab.de/www/htdocs/

deploy_ci: .build
	mkdir -p ~/.ssh
	echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config
	echo "${SSH_PRIVATE_KEY}" | base64 -d > ${HOME}/.ssh/deploy.id_rsa
	chmod 700 ${HOME}/.ssh/deploy.id_rsa
	rsync -azL -e "ssh -i ${HOME}/.ssh/deploy.id_rsa" --delete --progress .build/ root@mars.munichmakerlab.de:/var/www/vhosts/munichmakerlab.de/www/htdocs/
