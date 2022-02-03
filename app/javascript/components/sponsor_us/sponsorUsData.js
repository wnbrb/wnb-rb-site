import React from 'react';
import Ruby from 'components/icons/Ruby';
import Emerald from 'components/icons/Emerald';
import Sapphire from 'components/icons/Sapphire';
import Opal from 'components/icons/Opal';
import AboutUsSection from './AboutUsSection';
import WhySponsorUsSection from './WhySponsorUsSection';

export const sponsorCardData = [
    {
        icon: Ruby,
        type: 'Ruby',
        returns: [
            'Post on our jobs board',
            'Logo featured on our site',
            'Announcements at our events',
            'Sponsored events',
            'Two sponsored tweets per month',
        ],
        amount: '6,000',
    },
    {
        icon: Emerald,
        type: 'Emerald',
        returns: [
            'Post on our jobs board',
            'Logo featured on our site',
            'Announcements at our events',
        ],
        amount: '2,000',
    },
    {
        icon: Sapphire,
        type: 'Sapphire',
        returns: ['Post on our jobs board', 'Logo featured on our site'],
        amount: '1,000',
    },
    {
        icon: Opal,
        type: 'Opal',
        returns: ['Post on our jobs board'],
        amount: '500',
    },
];

export const infoCardData = [
    {
        title: 'About WNB.rb',
        section: <AboutUsSection />,
    },
    {
        title: 'Why sponsor WNB.rb?',
        section: <WhySponsorUsSection />,
    },
];
