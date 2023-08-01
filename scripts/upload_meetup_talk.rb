# Run with: rails runner scripts/upload_meetup_talk.rb

def run
  print "✨ Welcome to the WNB.rb meetup video upload script ✨"

  print "\n\nFirst, let's find or create a meetup object!"
  print "\n> Meetup date (mm/dd/yyyy): "

  date_string = gets.chomp
  month, day, year = date_string.split("/").map(&:to_i)
  date = Date.new(year, month, day)

  meetup = Event.where(date: date.beginning_of_day..date.end_of_day).first

  if meetup.nil?
    print "⚠️  No meetup found; creating new meetup..."
    meetup = Event.create(
      title: "#{Date::MONTHNAMES[date.month]} #{date.year} Meetup",
      date: date,
      type: "Meetup",
    )
    print "\n✅ Meetup created: #{meetup.title}"
  else
    print "\n✅ Meetup found: #{meetup.title}"
  end

  print "\n\nNext, let's find or create a speaker object:"

  # Create or find object representing speaker
  print "\n> Speaker name: "

  name = gets.chomp
  speaker = Speaker.where(name: name).first

  if speaker
    print "\n✅ Speaker found! Verifying info..."

    dirty = false

    print "\n\nHere's their current bio:\n\n#{speaker.bio}\n"
    print "\n> Would you like to update their bio? y/n: "

    if wait_for_y_n
      dirty = true
      print "> New bio:\n\n"
      speaker.bio = gets.chomp
    end

    print "\nHere's their current tagline: #{speaker.tagline}\n"
    print "> Would you like to update their tagline? y/n: "

    if wait_for_y_n
      dirty = true
      print "> New tagline: "
      speaker.tagline = gets.chomp
    end

    print "\nHere's their current image_url: #{speaker.image_url}\n"
    print "> Would you like to update their image_url? y/n: "

    if wait_for_y_n
      dirty = true
      print "> New image URL: "
      speaker.image_url = gets.chomp
    end

    if dirty
      speaker.save!
      print "\n✅ Speaker info updated!"
    end
  else
    print "\n⚠️  No speaker found; creating new speaker..."

    print "\n> Speaker bio:\n\n"
    bio = gets.chomp

    print "\n> Speaker tagline: "
    tagline = gets.chomp

    print "> Image URL: "
    image_url = gets.chomp

    speaker = Speaker.create!(
      name: name,
      bio: bio,
      tagline: tagline,
      image_url: image_url,
    )
    print "\n✅ Speaker created!"
  end

  print "\n\nFinally, let's create a talk object:"

  print "\n> Talk title: "
  talk_title = gets.chomp

  print "> Talk description:\n\n"
  talk_description = gets.chomp

  print "\n> Talk video URL (embed link from YouTube): "
  talk_video_link = gets.chomp

  EventSpeaker.create!(
    event_id: meetup.id,
    speaker_id: speaker.id,
    talk_title: talk_title,
    talk_description: talk_description,
    talk_video_link: talk_video_link,
  )
  print "\n✅ Created new talk! You're done!"
rescue StandardError => e
  print "\n\nOh no! 😱 You've run into an error. Here's the error message:\n\n#{e.message}"
end

def wait_for_y_n
  while true
    response = gets.chomp

    return true if ["y", "yes"].include?(response.downcase)
    return false if ["n", "no"].include?(response.downcase)

    print "> Sorry, please respond with \"y\" or \"n\": "
  end
end

run
