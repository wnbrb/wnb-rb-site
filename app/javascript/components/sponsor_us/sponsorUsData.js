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
        text: 'Everything in Emerald Sponsorship and also sponsored events and tweets',
        amount: '6,000',
    },
    {
        icon: Emerald,
        type: 'Emerald',
        text: 'Everything in Sapphire Sponsorship and also announcements at our events',
        amount: '2,000',
    },
    {
        icon: Saphire,
        type: 'Saphire',
        text: 'Post on our jobs board, logo featured on our site',
        amount: '1,000',
    },
    /*
     * TODO: Add Opal icon to add this section properly
    {
        icon: Opal,
        type: 'Opal',
        text: 'Pay for one year of Zoom pro, allowing WNB.rb members to host their own interview prep sessions, conference proposal workshops, and more!',
        amount: '500',
    },
    */
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
