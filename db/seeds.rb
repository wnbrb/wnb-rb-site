# frozen_string_literal: true

unless Rails.env.prod?
  Speaker.destroy_all
  EventSpeaker.destroy_all
  Event.destroy_all
  Job.destroy_all
  User.destroy_all
end

p 'Create a meetup with two speakers'

jemma =
  Speaker.create(
    name: 'Jemma Issroff',
    tagline: 'Creator and Maintainer of MemoWise',
    bio:
      "Lorem Ipsum is simply dummy text of the printing
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
  Ipsum.",
    image_url: 'https://picsum.photos/200/300',
  )

stefanni =
  Speaker.create(
    name: 'Stefanni Brasil',
    tagline: 'Founder of HexDevs',
    bio:
      "Lorem Ipsum is simply dummy text of the printing
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
        Ipsum.",
    image_url: 'https://picsum.photos/200/300',
  )

meetup =
  Meetup.create(
    title: 'August 2021 Meetup',
    description: 'Our meetup in August',
    date: DateTime.new(2021, 8, 31, 16).utc,
  )

EventSpeaker.create(
  event: meetup,
  speaker: jemma,
  talk_title: 'Intro to Ruby Memoization',
  talk_video_link: 'https://www.youtube.com/embed/n43O0u77d8o',
  talk_description:
    'Cras elementum, tortor id faucibus iaculis, augue metus
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
                     lectus a sapien vulputate auctor sit amet sit amet augue.',
)

EventSpeaker.create(
  event: meetup,
  speaker: stefanni,
  talk_title: 'How to get started with contributing to Ruby on Rails',
  talk_video_link: 'https://www.youtube.com/embed/n43O0u77d8o',
  talk_description:
    'Cras elementum, tortor id faucibus iaculis, augue metus
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
                     lectus a sapien vulputate auctor sit amet sit amet augue.',
)

p 'Create another meetup'

meetup2 =
  Meetup.create(
    title: 'July 2021 Meetup',
    description: 'Our meetup in July',
    date: DateTime.new(2021, 7, 31, 16).utc,
    panel_video_link: 'https://www.youtube.com/embed/GlpZPv1bp4g',
  )

EventSpeaker.create(
  event: meetup2,
  speaker: jemma,
  talk_title: 'Another Talk Title',
  talk_video_link: 'https://www.youtube.com/embed/n43O0u77d8o',
  talk_description:
    'Cras elementum, tortor id faucibus iaculis, augue metus
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
                     lectus a sapien vulputate auctor sit amet sit amet augue.',
)

p 'Create a panel with three panelists'

kerstin =
  Speaker.create(
    name: 'Kerstin Puschke',
    tagline: 'Staff Developer at Shopify',
    bio:
      "Lorem Ipsum is simply dummy text of the printing
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
  Ipsum.",
    image_url: 'https://picsum.photos/300/200',
  )

gabi =
  Speaker.create(
    name: 'Gabi Stefanini',
    tagline: 'Engineering Team Lead at Shopify',
    bio:
      "Lorem Ipsum is simply dummy text of the printing
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
        Ipsum.",
    image_url: 'https://picsum.photos/300/200',
  )

sylvia =
  Speaker.create(
    name: 'Sylvia Fronczak',
    tagline: 'Senior Developer at Shopify',
    bio:
      "Lorem Ipsum is simply dummy text of the printing
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
        Ipsum.",
    image_url: 'https://picsum.photos/300/200',
  )

panel =
  Panel.create(
    title: 'Panel on Technical Speaking',
    description:
      "We're so excited to see you at our special event
               tomorrow: a fireside chat about technical speaking!
               Kerstin Puschke, Sylvia Fronczak, and Gabi Stefanini
               will answer YOUR questions about everything from CFPs,
               to making slides, to delivering technical talks!",
    date: DateTime.new(2021, 7, 31, 16).utc,
  )

panel.speakers = [kerstin, gabi, sylvia]
panel.save

p 'Create an admin'

User.create!(
  name: 'Admin',
  email: 'admin@wnb.rb',
  password: 'password',
  password_confirmation: 'password',
)

p 'Create 4 jobs on the job board'

Job.create!(
  company: 'WNB.rb',
  title: 'Organizer',
  location: 'Remote',
  link: 'https://google.com',
  description:
    'Help organize WNB.rb, a community for women and non-binary Rubyists!
    Responsibilities include organizing and supporting underrepresented developers.',
  image_url: 'https://picsum.photos/200',
  sponsorship_level: 0,
)

Job.create!(
  company: 'The Empire',
  title: 'Sith Lord',
  location: 'A Planet Far, Far Away',
  link: 'https://google.com',
  description:
    'Would your direct reports describe you as "terrifying"? Do you excel at telepathic
    strangulation? If so, this is the oppportunity for you. You\'ll receive great benefits while
    having a direct imapct on eradicating those pesky Jedi knights!',
  image_url: 'https://picsum.photos/200',
  created_at: Time.now - 2.weeks,
  sponsorship_level: 3,
)

Job.create!(
  company: 'The Prancing Pony',
  title: 'Barmaid',
  location: 'The Shire',
  link: 'https://google.com',
  description:
    'Working at the Prancing Pony is never boring. We seek employees who are passionate about
    pouring beer and don\'t mind the occasional wraith stopping by.',
  image_url: 'https://picsum.photos/200',
  created_at: Time.now - 1.month,
  sponsorship_level: 2,
)

Job.create!(
  company: 'Pokemon Gym',
  title: 'Pokemon Trainer',
  location: 'Vermillion City',
  link: 'https://google.com',
  description:
    'You want to be the very best, like no one ever was. To catch them is your real test, to
    train them is your cause. You will travel across the land, searching far and wide. For
    Pokemon, to understand the power that\'s inside.',
  image_url: 'https://picsum.photos/200',
  created_at: Time.now - 3.months,
  sponsorship_level: 1,
)
