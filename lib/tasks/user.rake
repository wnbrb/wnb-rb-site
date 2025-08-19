# frozen_string_literal: true

desc 'Add an admin user to the database'
namespace :user do
  task :add_user, [:name, :email, :password] => :environment do |_, args|

    args.with_defaults(password: 'adminpassword123%')
    new_user = User.new(
      name: args[:name],
      email: args[:email],
      password: args[:password],
      password_confirmation: args[:password],
      role: User::ADMIN
    )
    if new_user.save
      puts 'Admin successfully added'
    else
      puts "Admin add failed: #{new_user.errors.full_messages.uniq.to_sentence}"
      puts
    end
  end
end
