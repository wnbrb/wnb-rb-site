import React, { useState, useRef, useEffect } from 'react';
import Logo from 'components/icons/Logo';

import 'stylesheets/header.scss';

const Header = () => {
    const links = [
        { id: 1, text: 'Events', href: '/meetups' },
        { id: 2, text: 'About', href: '/meetups' },
        { id: 3, text: 'Donate', href: 'https://buy.stripe.com/6oE7t874ReRc7gA9AN' },
        { id: 1, text: 'Support us', href: '/sponsor-us' },
        { id: 1, text: 'Join', href: '/join-us' },
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
