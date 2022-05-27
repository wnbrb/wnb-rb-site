import React, { useState } from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import SponsorCard from '../sponsor_us/SponsorCard';
import PageTitleWithContainer from 'components/PageTitleWithContainer';
import SponsorshipOption from '../sponsor_us/SponsorshipOption';
import { sponsorCardData } from '../sponsor_us/sponsorUsData';

import 'stylesheets/page';
import 'stylesheets/sponsor-us';

const SponsorUs = () => {
    return (
        <SharedLayout>
            <PageTitleWithContainer text="Sponsor Us" />

            <div className="text-xl leading-8 max-w-[500px] mx-auto mb-24 text-center">
                <p>Thank you for your interest in sponsoring WNB.rb!</p>
                <p className="mt-10">
                    We are in the process of revamping our sponsorship levels and are not accepting
                    new sponsors at this time. If you would like to be notified when we begin
                    seeking sponsors again, please fill out{' '}
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeMRuBCYfDsh8KsnKfgFiaKOs327syoSbtj63j8kG_HSn4AMw/viewform"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        this form
                    </a>
                    .
                </p>
            </div>
        </SharedLayout>
    );
};

/* eslint-disable no-unused-vars */
const SponsorUsWidget = () => {
    const [selectedLevel, setSelectedLevel] = useState(sponsorCardData[0].type);

    return (
        <div className="w-full flex flex-row justify-center mt-32 flex-wrap">
            {sponsorCardData.map((card) => {
                return (
                    selectedLevel === card.type && (
                        <SponsorCard
                            key={card.type}
                            type={card.type}
                            returns={card.returns}
                            amount={card.amount}
                            icon={card.icon}
                        />
                    )
                );
            })}

            <div className="flex flex-col justify-between h-max mt-5 md:mt-0 md:w-auto md:ml-7">
                {sponsorCardData.map((card) => {
                    return (
                        <SponsorshipOption
                            key={card.type}
                            title={card.type}
                            amount={card.amount}
                            onClick={() => setSelectedLevel(card.type)}
                            selected={card.type === selectedLevel}
                        />
                    );
                })}
            </div>
        </div>
    );
};
/* eslint-enable no-unused-vars */

export default SponsorUs;
