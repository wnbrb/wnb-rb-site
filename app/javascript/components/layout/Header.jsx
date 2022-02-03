import React, { useState, useRef, useEffect } from 'react';
import Logo from 'components/icons/Logo';
import AddUser from 'components/icons/AddUser';
import Button from 'components/Button';

import 'stylesheets/header.scss';

/* TODO: re-enable this rule after all links are in place */
/* eslint-disable jsx-a11y/anchor-is-valid */

const Header = () => {
    /* TODO: implement logic to incorporate is-active class in navbar links. */
    const [headerState, setHeaderState] = useState({
        className: '',
        isFixed: false,
    });
    const [heightHeader, setHeight] = useState(0);
    const headerEl = useRef(null);

    const [menuState, setMenuState] = useState({
        className: '',
        isOpen: false,
    });

    useEffect(() => {
        setHeight(headerEl.current.clientHeight);
    }, []);

    const handleScroll = () => {
        let isFixed = window.scrollY > heightHeader;
        setHeaderState({ className: isFixed ? 'is-fixed' : '', isFixed: isFixed });
    };

    const setHandleScroll = () => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    };

    useEffect(() => {
        setMenuState({ ...menuState, className: menuState.isOpen ? ' is-mobile-menu-open' : '' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuState.isOpen]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(setHandleScroll, []);

    return (
        <header className={`${headerState.className}${menuState.className}`} ref={headerEl}>
            <div className="header">
                <div className="inner">
                    <div className="logo">
                        <a href="/">
                            <Logo className="wnb-logo" />
                        </a>
                    </div>
                    <nav className={`nav${menuState.className}`}>
                        <div className="menu">
                            <ul>
                                <li>
                                    <a href="/jobs">Job Board</a>
                                </li>
                                <li>
                                    <a href="/sponsor-us"> Sponsor Us</a>
                                </li>
                            </ul>
                        </div>
                        <div className="user">
                            <div className="join-us">
                                <a
                                    href="https://tinyurl.com/join-wnb-rb"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <Button type="primary">
                                        <div className="join-wnb">
                                            <AddUser className="add-user-icon" />
                                            Join WNB.rb
                                        </div>
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
                <button
                    className={`hamburger${menuState.className}`}
                    type="button"
                    onClick={() => setMenuState({ ...menuState, isOpen: !menuState.isOpen })}
                >
                    <span className="bar" />
                    <span className="bar" />
                    <span className="bar" />
                </button>
            </div>
        </header>
    );
};
export default Header;
