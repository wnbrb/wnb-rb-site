# frozen_string_literal: true

unless Rails.env.prod?
  Speaker.destroy_all
  EventSpeaker.destroy_all
  Event.destroy_all
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
  )

EventSpeaker.create(
  event: meetup2,
  speaker: jemma,
  talk_title: 'Another Talk Title',
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
  image_url: 'todo: link-to-logo-here',
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
  image_url:
    'https://cdn.dribbble.com/users/917729/screenshots/5734135/media/c3f3be5b5f20ed110f3c8cf58a219bbe.jpg?compress=1&resize=1600x1200&vertical=top',
  created_at: Time.now - 2.weeks,
)

Job.create!(
  company: 'The Prancing Pony',
  title: 'Barmaid',
  location: 'The Shire',
  link: 'https://google.com',
  description:
    'Working at the Prancing Pony is never boring. We seek employees who are passionate about
    pouring beer and don\'t mind the occasional wraith stopping by.',
  image_url:
    'https://res.cloudinary.com/teepublic/image/private/s--wjZ33yki--/t_Preview/b_rgb:484849,c_limit,f_auto,h_630,q_90,w_630/v1446223594/production/designs/188502_1.jpg',
  created_at: Time.now - 1.month,
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
  image_url:
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8c1278f2-6f53-4727-b803-1a4c297c191f/dapbbed-30642074-7c2d-43c2-ad05-be7bc0f0089a.png/v1/fill/w_1600,h_1600,strp/original_pokeball_vector_by_greenmachine987_dapbbed-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTYwMCIsInBhdGgiOiJcL2ZcLzhjMTI3OGYyLTZmNTMtNDcyNy1iODAzLTFhNGMyOTdjMTkxZlwvZGFwYmJlZC0zMDY0MjA3NC03YzJkLTQzYzItYWQwNS1iZTdiYzBmMDA4OWEucG5nIiwid2lkdGgiOiI8PTE2MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.cisWXCiz7JCdLjr-HzGGsjoQUsGf6StVLVGStptev20',
  created_at: Time.now - 3.months,
)
