import React from 'react'
import Logo from 'components/images/Logo'

import 'stylesheets/header'

const Header = () => (
  <div className='header'>
    <div className='left-header'>
      <a href="/">
        <Logo size={40} />
      </a>

      <a href="#">
        Upcoming Meetup
      </a>

      <a href="#">
        Archive
      </a>

      <a href="#">
        Sponsor Us
      </a>
    </div>

    <div className='right-header'>
      <a href="https://tinyurl.com/join-wnb-rb" target="_blank" rel="noreferrer noopener">
        Join WNB.rb
      </a>
    </div>
  </div>
)

export default Header;
