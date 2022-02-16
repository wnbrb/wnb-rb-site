import React, { useState } from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import SponsorCard from '../sponsor_us/SponsorCard';
import PageTitleWithContainer from 'components/PageTitleWithContainer';
import Button from 'components/Button';
import Banner from 'components/Banner';
import SponsorsTile from 'components/SponsorsTile';
import SponsorUsInfoCard from '../sponsor_us/SponsorUsInfoCard';
import SponsorshipOption from '../sponsor_us/SponsorshipOption';
import { sponsorCardData, infoCardData } from '../sponsor_us/sponsorUsData';

import 'stylesheets/page';
import 'stylesheets/sponsor-us';

const SponsorUs = () => {
    return (
        <SharedLayout>
            <PageTitleWithContainer text="Sponsor Us" />
            <SponsorUsWidget />

            <Banner>
                Have something else in mind? Let&apos;s talk!
                <Button type="white" className="ml-0 md:ml-5 mt-5 md:mt-0">
                    <a
                        href={'mailto:organizers@wnb-rb.dev'}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Contact Us
                    </a>
                </Button>
            </Banner>

            <div className="w-full flex flex-row flex-wrap justify-center mt-32">
                {infoCardData.map((card) => {
                    return (
                        <SponsorUsInfoCard
                            key={card.title}
                            section={card.section}
                            title={card.title}
                        />
                    );
                })}
            </div>

            <SponsorsTile />
        </SharedLayout>
    );
};

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

export default SponsorUs;
