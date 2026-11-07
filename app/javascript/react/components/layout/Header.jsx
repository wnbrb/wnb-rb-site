import React, { useState, useRef, useEffect } from 'react';
import Logo from '../icons/Logo';
import AlertBanner from '../AlertBanner';

import '../../stylesheets/header.scss';

const DONATE_URL = 'https://givebutter.com/wnbrb-our-next-chapter';
const REDIRECT_DELAY = 3000;
const NOTICE_DURATION = 8000;

const Header = () => {
    const links = [
        { id: 1, text: 'About Us', href: '/about' },
        { id: 2, text: 'Events', href: '/meetups' },
        { id: 3, text: 'Our Community', href: '/community' },
        { id: 4, text: 'Resources', href: '/resources' },
        { id: 5, text: 'Donate', href: DONATE_URL, external: true },
        { id: 6, text: 'Support us', href: '/sponsor-us' },
        { id: 7, text: 'Join', href: '/join-us' },
    ];

    const [headerState, setHeaderState] = useState({
        className: '',
        isFixed: false,
    });
    const [heightHeader, setHeight] = useState(0);
    const headerEl = useRef(null);
    const externalLinkRef = useRef(null);
    const redirectTimeout = useRef(null);
    const noticeTimeout = useRef(null);

    const [menuState, setMenuState] = useState({
        className: '',
        isOpen: false,
    });

    const [showExternalNotice, setShowExternalNotice] = useState(false);

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

    useEffect(
        () => () => {
            if (redirectTimeout.current) clearTimeout(redirectTimeout.current);
            if (noticeTimeout.current) clearTimeout(noticeTimeout.current);
        },
        [],
    );

    const dismissExternalNotice = () => {
        if (noticeTimeout.current) clearTimeout(noticeTimeout.current);
        setShowExternalNotice(false);
    };

    const handleLinkClick = (event, link) => {
        if (!link.external) return;

        event.preventDefault();
        setMenuState((current) => ({ ...current, isOpen: false }));
        setShowExternalNotice(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (noticeTimeout.current) clearTimeout(noticeTimeout.current);
        noticeTimeout.current = setTimeout(() => {
            setShowExternalNotice(false);
        }, NOTICE_DURATION);

        if (redirectTimeout.current) clearTimeout(redirectTimeout.current);
        redirectTimeout.current = setTimeout(() => {
            if (externalLinkRef.current) externalLinkRef.current.click();
        }, REDIRECT_DELAY);
    };

    return (
        <>
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
                                            <a
                                                href={val.href}
                                                target={val.external ? '_blank' : undefined}
                                                rel={
                                                    val.external ? 'noopener noreferrer' : undefined
                                                }
                                                onClick={(event) => handleLinkClick(event, val)}
                                            >
                                                {val.text}
                                            </a>
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
            <a
                ref={externalLinkRef}
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                hidden
            />
            {showExternalNotice && (
                <AlertBanner
                    type="warning"
                    message="You're leaving this site to go to our donation account."
                    onClose={dismissExternalNotice}
                />
            )}
        </>
    );
};
export default Header;
