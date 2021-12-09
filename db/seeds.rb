# frozen_string_literal: true

unless Rails.env.prod?
  Speaker.destroy_all
  EventSpeaker.destroy_all
  Event.destroy_all
end

p 'Create a meetup with two speakers'

jemma = Speaker.create(
  name: 'Jemma Issroff',
  tagline: 'Creator and Maintainer of MemoWise',
  bio: "Lorem Ipsum is simply dummy text of the printing
  and typesetting industry. Lorem Ipsum has been the
  industry's standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and
  scrambled it to make a type specimen book. It has
  survived not only five centuries, but also the leap
  into electronic typesetting, remaining essentially
  unchanged. It was popularised in the 1960s with the
  release of Letraset sheets containing Lorem Ipsum
  passages, and more recently with desktop publishing
  software like Aldus PageMaker including versions of Lorem
  Ipsum."
)

stefanni = Speaker.create(
  name: 'Stefanni Brasil',
  tagline: 'Founder of HexDevs',
  bio: "Lorem Ipsum is simply dummy text of the printing
        and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has
        survived not only five centuries, but also the leap
        into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the
        release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing
        software like Aldus PageMaker including versions of Lorem
        Ipsum."
)

meetup = Meetup.create(
  title: 'August 2021 Meetup',
  description: 'Our meetup in August',
  date: DateTime.new(2021, 8, 31, 16).utc
)

EventSpeaker.create(
  event: meetup,
  speaker: jemma,
  talk_title: 'Intro to Ruby Memoization',
  talk_description: 'Cras elementum, tortor id faucibus iaculis, augue metus
                     pretium massa, luctus auctor odio ligula vel justo. Sed
                     lacinia hendrerit felis, et dictum ante porttitor in.
                     Suspendisse ut sem dolor. In hac habitasse platea dictumst.
                     Maecenas dapibus ex nisi, quis pretium odio ultrices ac.
                     Nunc ligula nunc, gravida porttitor felis dignissim, euismod
                     posuere ante. Curabitur congue tellus purus, id posuere sem
                     maximus fermentum. Aenean vehicula ipsum nec condimentum
                     vehicula. Nunc sit amet imperdiet elit. Proin lacinia sed
                     dui pharetra sollicitudin. Maecenas vel enim a ante suscipit
                     aliquam. Cras placerat elit eu ultricies pulvinar. Cras et
                     lectus a sapien vulputate auctor sit amet sit amet augue.'
)

EventSpeaker.create(
  event: meetup,
  speaker: stefanni,
  talk_title: 'How to get started with contributing to Ruby on Rails',
  talk_description: 'Cras elementum, tortor id faucibus iaculis, augue metus
                     pretium massa, luctus auctor odio ligula vel justo. Sed
                     lacinia hendrerit felis, et dictum ante porttitor in.
                     Suspendisse ut sem dolor. In hac habitasse platea dictumst.
                     Maecenas dapibus ex nisi, quis pretium odio ultrices ac.
                     Nunc ligula nunc, gravida porttitor felis dignissim, euismod
                     posuere ante. Curabitur congue tellus purus, id posuere sem
                     maximus fermentum. Aenean vehicula ipsum nec condimentum
                     vehicula. Nunc sit amet imperdiet elit. Proin lacinia sed
                     dui pharetra sollicitudin. Maecenas vel enim a ante suscipit
                     aliquam. Cras placerat elit eu ultricies pulvinar. Cras et
                     lectus a sapien vulputate auctor sit amet sit amet augue.'
)

p 'Create a panel with three panelists'

kerstin = Speaker.create(
  name: 'Kerstin Puschke',
  tagline: 'Staff Developer at Shopify',
  bio: "Lorem Ipsum is simply dummy text of the printing
  and typesetting industry. Lorem Ipsum has been the
  industry's standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and
  scrambled it to make a type specimen book. It has
  survived not only five centuries, but also the leap
  into electronic typesetting, remaining essentially
  unchanged. It was popularised in the 1960s with the
  release of Letraset sheets containing Lorem Ipsum
  passages, and more recently with desktop publishing
  software like Aldus PageMaker including versions of Lorem
  Ipsum."
)

gabi = Speaker.create(
  name: 'Gabi Stefanini',
  tagline: 'Engineering Team Lead at Shopify',
  bio: "Lorem Ipsum is simply dummy text of the printing
        and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has
        survived not only five centuries, but also the leap
        into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the
        release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing
        software like Aldus PageMaker including versions of Lorem
        Ipsum."
)

sylvia = Speaker.create(
  name: 'Sylvia Fronczak',
  tagline: 'Senior Developer at Shopify',
  bio: "Lorem Ipsum is simply dummy text of the printing
        and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has
        survived not only five centuries, but also the leap
        into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the
        release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing
        software like Aldus PageMaker including versions of Lorem
        Ipsum."
)

panel = Panel.create(
  title: 'July 2021 Meetup',
  description: "We're so excited to see you at our special event
               tomorrow: a fireside chat about technical speaking!
               Kerstin Puschke, Sylvia Fronczak, and Gabi Stefanini
               will answer YOUR questions about everything from CFPs,
               to making slides, to delivering technical talks!",
  date: DateTime.new(2021, 7, 31, 16).utc
)

panel.speakers = [kerstin, gabi, sylvia]
panel.save

p 'Create an admin'

User.create!(
  name: 'Admin',
  email: 'admin@wnb.rb',
  password: 'password',
  password_confirmation: 'password'
)
