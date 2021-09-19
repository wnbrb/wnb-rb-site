import React from 'react';
import Logo from 'components/icons/Logo';
import AddUser from 'components/icons/AddUser';
import Button from 'components/Button';

import 'stylesheets/header';

/* TODO: re-enable this rule after all links are in place */
/* eslint-disable jsx-a11y/anchor-is-valid */

const Header = () => (
    <div className="header">
        <div className="left-header">
            <a href="/">
                <Logo className={'wnb-logo'} />
            </a>

            <a href="#">Upcoming Meetup</a>

            <a href="#">Archive</a>

            <a href="#">Sponsor Us</a>
        </div>

        <div className="right-header">
            <a href="https://tinyurl.com/join-wnb-rb" target="_blank" rel="noreferrer noopener">
                <Button type="primary">
                    <div className="join-wnb">
                        <AddUser className="add-user-icon" />
                        Join WNB.rb
                    </div>
                </Button>
            </a>
        </div>
    </div>
);

export default Header;
