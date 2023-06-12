import React from 'react';
import Email from 'components/icons/Email';
import Github from 'components/icons/Github';
import Twitter from 'components/icons/Twitter';

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
                    <a className="footer-col-item" href="/partner-with-us">
                        Partner with Us
                    </a>
                    <a className="footer-col-item" href="/donate">
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
                    <a className="footer-col-item" href="/jobs">
                        Job Board
                    </a>
                    <a className="footer-col-item" href="/meetups">
                        Past Meetups
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
                        <Email className="social-icon" />
                    </a>
                    <a
                        href="https://twitter.com/wnb_rb"
                        aria-label="Twitter"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Twitter className="social-icon" />
                    </a>
                    <a
                        href="https://github.com/wnbrb"
                        aria-label="Github"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Github className="social-icon" />
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
