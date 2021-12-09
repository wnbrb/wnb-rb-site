import React from 'react';
import Ruby from 'components/icons/Ruby';
import Emerald from 'components/icons/Emerald';
import Sapphire from 'components/icons/Sapphire';
import Opal from 'components/icons/Opal';
import InformationMark from 'components/icons/InformationMark';
import QuestionMark from 'components/icons/QuestionMark';
import AboutUsSection from './AboutUsSection';
import WhySponsorUsSection from './WhySponsorUsSection';

export const sponsorCardData = [
    {
        icon: Opal,
        type: 'Opal',
        returns: ['Post on our jobs board'],
        amount: '500',
    },
    {
        icon: Sapphire,
        type: 'Sapphire',
        returns: ['Post on our jobs board', 'Logo featured on our site'],
        amount: '1,000',
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
        icon: Ruby,
        type: 'Ruby',
        returns: [
            'Post on our jobs board',
            'Logo featured on our site',
            'Announcements at our events',
            'Sponsored events',
        ],
        amount: '6,000',
    },
];

export const infoCardData = [
    {
        icon: InformationMark,
        title: 'About WNB.rb',
        section: <AboutUsSection />,
    },
    {
        icon: QuestionMark,
        title: 'Why sponsor WNB.rb?',
        section: <WhySponsorUsSection />,
    },
];
