setup:
	bundle install && yarn install && rails db:setup

start:
	foreman start

start_client:
	bin/shakapacker-dev-server

start_server:
	rails server
