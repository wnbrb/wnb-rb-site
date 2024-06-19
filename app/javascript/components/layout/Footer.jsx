import React from 'react';

import 'stylesheets/footer.scss';

const Footer = () => (
    <footer>
        <div className="footer">
            <div className="footer-left">
                <div className="footer-col">
                    <p className="footer-col-item footer-col-title">Get Involved</p>
                    <a className="footer-col-item" href="/join-us">
                        Join WNB.rb
                    </a>
                    <a className="footer-col-item" href="/sponsor-us">
                        Sponsor Us
                    </a>
                    <a className="footer-col-item" href="https://buy.stripe.com/6oE7t874ReRc7gA9AN">
                        Donate
                    </a>
                </div>
                <div className="footer-col">
                    <p className="footer-col-item footer-col-title">Community Guidelines</p>
                    <a
                        className="footer-col-item"
                        href="https://tinyurl.com/wnb-rb-coc"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Code of Conduct
                    </a>
                    <a
                        className="footer-col-item"
                        href="https://tinyurl.com/wnb-rb-slack-guidelines"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Slack Guidelines
                    </a>
                </div>
                <div className="footer-col">
                    <p className="footer-col-item footer-col-title">Resources</p>
                    <a className="footer-col-item" href="/meetups">
                        Meetups
                    </a>
                </div>
            </div>

            <div className="footer-right">
                <div className="social-links">
                    <a
                        href="mailto:organizers@wnb-rb.dev"
                        aria-label="Email"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="bi bi-envelope-fill"></i>
                    </a>
                    <a
                        href="https://ruby.social/@wnb_rb"
                        aria-label="Mastodon"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="bi bi-mastodon"></i>
                    </a>
                    <a
                        href="https://github.com/wnbrb"
                        aria-label="Github"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="bi bi-github"></i>
                    </a>
                    <a
                        href="https://www.linkedin.com/company/wnb-rb"
                        aria-label="LinkedIn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="bi bi-linkedin"></i>
                    </a>
                </div>
                <p className="made-with-love">
                    Made with{' '}
                    <span role="img" aria-label="heart">
                        ❤️
                    </span>{' '}
                    by WNB.rb community members.
                </p>
            </div>
        </div>
    </footer>
);
export default Footer;
