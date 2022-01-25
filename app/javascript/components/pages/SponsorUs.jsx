import React from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import SponsorCard from '../sponsor_us/SponsorCard';
import PageTitleWithContainer from 'components/PageTitleWithContainer';
import SponsorUsInfoCard from '../sponsor_us/SponsorUsInfoCard';
import SponsorCTA from '../sponsor_us/SponsorCTA';
import { sponsorCardData, infoCardData } from '../sponsor_us/sponsorUsData';
import 'stylesheets/page';
import 'stylesheets/home';
import 'stylesheets/sponsor-us';

const SponsorUs = () => {
    return (
        <SharedLayout>
            <PageTitleWithContainer text="Sponsor Us" />
            <div className="card-container flex flex-wrap justify-center">
                {sponsorCardData.map((card) => {
                    return (
                        <SponsorCard
                            key={card.type}
                            type={card.type}
                            returns={card.returns}
                            amount={card.amount}
                        >
                            <card.icon className="mx-auto p-2 h-20" />
                        </SponsorCard>
                    );
                })}
            </div>
            <div className="flex flex-col items-center my-24">
                {infoCardData.map((card) => {
                    return (
                        <SponsorUsInfoCard
                            key={card.title}
                            section={card.section}
                            title={card.title}
                        >
                            <card.icon className="m-2" />
                        </SponsorUsInfoCard>
                    );
                })}
            </div>
            <SponsorCTA />
        </SharedLayout>
    );
};
export default SponsorUs;
