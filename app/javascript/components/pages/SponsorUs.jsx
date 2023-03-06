import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import SharedLayout from 'components/layout/SharedLayout';
import SponsorCard from '../sponsor_us/SponsorCard';
import PageTitleWithContainer from 'components/PageTitleWithContainer';
import SponsorshipOption from '../sponsor_us/SponsorshipOption';
import { sponsorCardData } from '../sponsor_us/sponsorUsData';

import 'stylesheets/page';
import 'stylesheets/sponsor-us';

const SponsorUs = () => {
    return (
        <>
            <Helmet>
                <title>Partner with Us | WNB.rb</title>
            </Helmet>
            <SharedLayout>
                <PageTitleWithContainer text="Partner with us" />

                <div className="text-xl leading-8 max-w-[550px] mx-auto px-10 md:px-8 xxl:px-0 mb-24 text-center">
                    <p>
                        <b>WNB.rb is looking for companies to partner with us for 2023!</b>
                    </p>
                    <p className="mt-10">
                        We are currently designing our new partnership process and are eager to
                        learn more about your company. If you are interested in partnering with
                        WNB.rb, please fill out this{' '}
                        <a
                            href="https://forms.gle/fgiaChfHtZWdNPLZ9"
                            className="whitespace-nowrap font-medium hover:text-red-400"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            this form
                        </a>{' '}
                        and{' '}
                        <a
                            href="https://calendly.com/wnb-rb-organizers/meeting"
                            className="whitespace-nowrap font-medium hover:text-red-400"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            book time to meet with us
                        </a>
                        .
                    </p>
                    <p className="mt-10">
                        In the meantime, we encourage you to invite any women or non-binary
                        developers on your team to{' '}
                        <a
                            href="https://tinyurl.com/join-wnb-rb"
                            className="whitespace-nowrap font-medium hover:text-red-400"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            join our community
                        </a>
                        . Getting to know the engineers who work for our partners will help our
                        partnerships succeed!
                    </p>
                </div>
            </SharedLayout>
        </>
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
