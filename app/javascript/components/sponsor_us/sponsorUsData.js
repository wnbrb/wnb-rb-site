import React from 'react';
import Ruby from 'components/icons/Ruby';
import Emerald from 'components/icons/Emerald';
import Saphire from 'components/icons/Saphire';
import InformationMark from 'components/icons/InformationMark';
import QuestionMark from 'components/icons/QuestionMark';
import AboutUsSection from './AboutUsSection';
import WhySponsorUsSection from './WhySponsorUsSection';

export const sponsorCardData = [
    {
        icon: Ruby,
        type: 'Ruby',
        text: 'Provide books for all members of WNB.rb’s book club who would not otherwise be able to afford them.',
        amount: '2,000',
    },
    {
        icon: Emerald,
        type: 'Emerald',
        text: 'Compensate 6 months of women and non-binary speakers who give talks at our meetups.',
        amount: '1,200',
    },
    {
        icon: Saphire,
        type: 'Saphire',
        text: 'Pay for one year of Zoom pro, allowing WNB.rb members to host their own interview prep sessions, conference proposal workshops, and more!',
        amount: '180',
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
