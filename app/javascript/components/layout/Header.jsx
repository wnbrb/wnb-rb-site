import React, { useState, useRef, useEffect } from 'react';
import Logo from 'components/icons/Logo';
import AddUser from 'components/icons/AddUser';
import Button from 'components/Button';

import 'stylesheets/header.scss';

const Header = () => {
    const links = [
        { id: 1, text: 'Job Board', href: '/jobs' },
        { id: 2, text: 'Meetups', href: '/meetups' },
        { id: 3, text: 'Partner with Us', href: '/partner-with-us' },
    ];

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
                        <a href="/" alt="WNB-RB" aria-label="return to home page">
                            <Logo className="wnb-logo" />
                        </a>
                    </div>
                    <nav className={`nav${menuState.className}`}>
                        <div className="menu">
                            <ul>
                                {links.map((val) => (
                                    <li
                                        key={`link-${val.id}`}
                                        className={
                                            location.pathname + location.search === val.href
                                                ? 'is-active'
                                                : undefined
                                        }
                                    >
                                        <a href={val.href}>{val.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="user">
                            <div className="donate">
                                <a href="/donate">
                                    <Button type="white-and-orange">Donate</Button>
                                </a>
                            </div>
                            <div className="join-us">
                                <a href="/join-us">
                                    <Button type="primary">
                                        <div className="join-wnb flex items-center">
                                            <AddUser className="add-user-icon h-4 w-4 mr-3 fill-current" />
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
                    aria-label="Menu"
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
