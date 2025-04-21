# frozen_string_literal: true

desc 'Add an admin user to the database'
namespace :user do
  task :add_user, [:name, :email, :password, :password_confirmation, :role] => :environment do |_, args|

    args.with_defaults(password: 'adminpassword123%',  password_confirmation: 'adminpassword123%', role: User::ADMIN)
    new_user = User.new(
      name:args[:name],
      email:args[:email],
      password:args[:password],
      password_confirmation:args[:password_confirmation],
      role:args[:role]
    )
    if new_user.save
      #raw, hashed = Devise.token_generator.generate(User, :reset_password_token)
      #new_user.reset_password_token = hashed
      #new_user.reset_password_sent_at = Time.now.utc
      #Devise::Mailer.reset_password_instructions(new_user, raw)
      puts 'Admin successfully added'
    else
      puts "Admin add failed: #{new_user.errors.full_messages.uniq.to_sentence}"
      puts
    end
  end
end