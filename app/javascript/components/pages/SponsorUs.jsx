import React, { useState } from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import SponsorCard from '../sponsor_us/SponsorCard';
import PageTitleWithContainer from 'components/PageTitleWithContainer';
import Button from 'components/Button';
import Card from 'components/Card';
import SponsorsTile from 'components/SponsorsTile';
import SponsorUsInfoCard from '../sponsor_us/SponsorUsInfoCard';
import SponsorshipOption from '../sponsor_us/SponsorshipOption';
import { sponsorCardData, infoCardData } from '../sponsor_us/sponsorUsData';

import 'stylesheets/page';
import 'stylesheets/sponsor-us';

const SponsorUs = () => {
    const [selectedLevel, setSelectedLevel] = useState(sponsorCardData[0].type);

    return (
        <SharedLayout>
            <PageTitleWithContainer text="Sponsor Us" />
            <div className="w-max mx-auto mt-32 flex flex-row">
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

                <div className="flex flex-col justify-between h-max ml-7">
                    {sponsorCardData.map((card) => {
                        return (
                            <button
                                key={`${card.type}-options`}
                                onClick={() => setSelectedLevel(card.type)}
                            >
                                <SponsorshipOption
                                    title={card.type}
                                    amount={card.amount}
                                    selected={card.type === selectedLevel}
                                />
                            </button>
                        );
                    })}
                </div>
            </div>
            <SomethingElseBanner />
            <div className="flex flex-row w-max mx-auto mt-32">
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

const SomethingElseBanner = () => {
    return (
        <div className="something-else-banner">
            <Card className="something-else-card">
                Have something else in mind? Let&apos;s talk!
                <Button type="white" className="ml-0 md:ml-5 mt-5 md:mt-0">
                    <a href={'mailto:organizers@wnb-rb.dev'}>Contact Us</a>
                </Button>
            </Card>
        </div>
    );
};

export default SponsorUs;
