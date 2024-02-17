setup:
	bundle install && yarn install && yarn build && yarn build:css && rails db:setup

start:
	foreman start

start_client:
	bin/shakapacker-dev-server

start_server:
	rails server
