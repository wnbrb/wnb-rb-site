import React from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import SponsorCard from '../sponsor_us/SponsorCard';
import SponsorUsInfoCard from '../sponsor_us/SponsorUsInfoCard';
import { sponsorCardData, infoCardData } from '../sponsor_us/sponsorUsData';
import 'stylesheets/page';
import 'stylesheets/sponsor-us';

console.log(sponsorCardData);

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
                        >
                            <card.icon className="mx-auto p-2 h-24" />
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
        </SharedLayout>
    );
};
export default SponsorUs;
