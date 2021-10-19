import React from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import SponsorCard from 'components/SponsorCard';
import Ruby from 'components/icons/Ruby';
import Emerald from 'components/icons/Emerald';
import Saphire from 'components/icons/Saphire';
import 'stylesheets/page';
import 'stylesheets/sponsor-us';

const sponsorCardData = [
    {
        type: 'Ruby',
        text: 'Provide books for all members of WNB.rb’s book club who would not otherwise be able to afford them.',
        amount: '2,000',
        icon: (className) => <Ruby className={className} />,
    },
    {
        type: 'Emerald',
        text: 'Compensate 6 months of women and non-binary speakers who give talks at our meetups.',
        amount: '1,200',
        icon: (className) => <Emerald className={className} />,
    },
    {
        type: 'Saphire',
        text: 'Pay for one year of Zoom pro, allowing WNB.rb members to host their own interview prep sessions, conference proposal workshops, and more!',
        amount: '180',
        icon: (className) => <Saphire className={className} />,
    },
];

const SponsorUs = () => {
    return (
        <SharedLayout>
            <div className="flex flex-wrap justify-center">
                {sponsorCardData.map((card) => {
                    return (
                        <SponsorCard
                            key={card.type}
                            type={card.type}
                            text={card.text}
                            amount={card.amount}
                            icon={card.icon}
                        />
                    );
                })}
            </div>
        </SharedLayout>
    );
};

export default SponsorUs;
