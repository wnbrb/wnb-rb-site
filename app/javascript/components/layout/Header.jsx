import React from 'react';
import Logo from 'components/icons/Logo';
import AddUser from 'components/icons/AddUser';
import Button from 'components/Button';

import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import 'stylesheets/header';

const Header = () => (
    <Popover as="header" className="header">
        <div className="header-container">
            <a href="/">
                <span className="sr-only">WNB.rb</span>
                <Logo className={'wnb-logo'} />
            </a>
            <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button className="header-menu-icon">
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
            </div>
            <div className="header-nav">
                <Popover.Group as="nav" className="flex space-x-10">
                    <a href="/">Upcoming Meetup</a>
                    <a href="/">Archive</a>
                    <a href="/">Sponsor Us</a>
                </Popover.Group>
                <div className="flex items-center md:ml-12">
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
        </div>

        <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <Popover.Panel focus className="popover">
                <div className="popover-container">
                    <div className="pt-5 pb-6 px-5">
                        <div className="flex items-center justify-between">
                            <Logo className={'wnb-logo'} />
                            <div className="-mr-2">
                                <Popover.Button className="header-x-icon bg-white">
                                    <span className="sr-only">Close menu</span>
                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>
                        </div>
                    </div>
                    <div className="py-6 px-5">
                        <div className="grid grid-cols-1 gap-4">
                            <a href="/">Upcoming Meetup</a>
                            <a href="/">Archive</a>
                            <a href="/">Sponsor Us</a>
                        </div>
                        <div className="mt-6">
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
                </div>
            </Popover.Panel>
        </Transition>
    </Popover>
);

export default Header;
