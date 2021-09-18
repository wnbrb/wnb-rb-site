import React from 'react'
import Email from 'components/icons/Email'
import LinkedIn from 'components/icons/LinkedIn'
import Twitter from 'components/icons/Twitter'

import 'stylesheets/footer'

const Footer = () => (
  <div className='footer'>
    <div className='footer-left'>
      <div className='footer-col'>
        <p className='footer-col-item footer-col-title'>WNB.rb Meetup</p>
        <a className='footer-col-item' href="#">Upcoming Meetup</a>
        <a className='footer-col-item' href="#">Archive</a>
        <a className='footer-col-item' href="#">Give a Talk</a>
      </div>

      <div className='footer-col'>
        <p className='footer-col-item footer-col-title'>For Members</p>
        <a className='footer-col-item' href="https://tinyurl.com/join-wnb-rb" target="_blank" rel="noopener noreferrer">Join WNB.rb</a>
        <a className='footer-col-item' href="https://tinyurl.com/wnb-rb-coc" target="_blank" rel="noopener noreferrer">Code of Conduct</a>
        <a className='footer-col-item' href="https://tinyurl.com/wnb-rb-slack-guidelines" target="_blank" rel="noopener noreferrer">Slack Guidelines</a>
      </div>

      <div className='footer-col'>
        <p className='footer-col-item footer-col-title'>For Sponsors</p>
        <a className='footer-col-item' href="#">Sponsor Us</a>
      </div>
    </div>

    <div className='footer-right'>
      <div className='social-links'>
        <a href="#">
          <Email className='social-icon' />
        </a>
        <a href="https://twitter.com/wnb_rb" target="_blank" rel="noopener noreferrer">
          <Twitter className='social-icon' />
        </a>
        <a href="https://www.linkedin.com/company/wnb-rb" target="_blank" rel="noopener noreferrer">
          <LinkedIn className='social-icon' />
        </a>
      </div>
      <p className='made-with-love'>Made with ❤️ by WNB.rb community members.</p>
    </div>
  </div>
)

export default Footer;
