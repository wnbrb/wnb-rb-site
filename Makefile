setup:
	bundle install && yarn install && rails db:setup

start:
	foreman start

start_client:
	bin/webpack-dev-server

start_server:
	rails server
