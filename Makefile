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
	export BOTO_CONFIG=/dev/null
	which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )
	mkdir -p ~/.ssh
	eval $(ssh-agent -s)
	echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config
	ssh-add <(echo "${SSH_PRIVATE_KEY}" | base64 -d)
	rsync -azL --delete --progress .build/ root@mars.munichmakerlab.de:/var/www/vhosts/munichmakerlab.de/www/htdocs/
