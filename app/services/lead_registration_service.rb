# frozen_string_literal: true
require 'google_drive'

class LeadRegistrationService
  def initialize(info)
    @info = info
    @name = info[:name]
    @email = info[:email]
    @join_slack = info[:joinSlack]
    @join_google_group = info[:joinGoogleGroup]
    @identify_as = info[:identifyAs]
    @current_job = info[:currentJob]
    @looking_for_job = info[:lookingForJob]
    @time_stamp = DateTime.current.strftime('%-m/%-d/%Y %H:%M:%S')
  end

  def update_google_sheet
    session = authenticate_session
    # spreadsheet = define_spreedsheet_by_title(session, "Join WNB.rb! (Responses)")
    spreadsheet = define_spreedsheet_by_key(session, '1OcDwEc6Z4DkKvPbAwQlu9ABb5ZW4und0HTOwDIl44b4')

    # Get the first worksheet
    worksheet = spreadsheet.worksheets.first

    worksheet.insert_rows(worksheet.num_rows + 1,
    [[@time_stamp, @name, @email, @join_slack, @join_google_group, @identify_as, @current_job, @looking_for_job]])
    worksheet.save
  end

  def define_spreedsheet_by_title(session, title)
    session.spreadsheet_by_title(title)
  end

  def define_spreedsheet_by_key(session, key)
    session.spreadsheet_by_key(key)
  end

  private
  def authenticate_session
    # Authenticate a session with your Service Account
    path = Rails.root.join('googleconfig.json')
    GoogleDrive::Session.from_service_account_key(path)
  end
end