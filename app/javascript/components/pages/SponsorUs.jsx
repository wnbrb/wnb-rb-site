import React from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import SponsorCard from 'components/SponsorCard';
import SponsorUsInfoCard from 'components/SponsorUsInfoCard';
import Ruby from 'components/icons/Ruby';
import Emerald from 'components/icons/Emerald';
import Saphire from 'components/icons/Saphire';
import InformationMark from 'components/icons/InformationMark';
import QuestionMark from 'components/icons/QuestionMark';
import 'stylesheets/page';
import 'stylesheets/sponsor-us';

const sponsorCardData = [
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

const infoCardData = [
    {
        icon: InformationMark,
        title: 'About WNB.rb',
        text: {
            paragraph1:
                'WNB.rb is a virtual community of over 200 women and non-binary Rubyists. It was founded in 2021 by Jemma Issroff and Emily Giurleo with the goal of supporting a more diverse group of people in making meaningful contributions to the Ruby world.',
            paragraph2:
                'WNB.rb initiatives include a monthly meetup featuring two technical speakers, a thriving Slack discussion space, a job interview preparation group, regular panels on rotating topics, a conference proposal working group, and more!',
        },
    },
    {
        icon: QuestionMark,
        title: 'Why sponsor WNB.rb?',
        text: {
            paragraph1:
                'Brand exposure to over 200 women and non-binary Rubyists. Announcements about your company at WNB.rb events. Post open positions in the #jobs channel on WNB.rb’s Slack. Your company’s name and logo featured on the WNB.rb website.',
            paragraph2:
                'Have something else in mind? Please get in touch, and we’d be happy to discuss!',
        },
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
                        >
                            <card.icon className="mx-auto p-2 h-24" />
                        </SponsorCard>
                    );
                })}
            </div>
            <div className="flex flex-col items-center my-24">
                {infoCardData.map((card) => {
                    return (
                        <SponsorUsInfoCard key={card.title} text={card.text} title={card.title}>
                            <card.icon className="m-2" />
                        </SponsorUsInfoCard>
                    );
                })}
            </div>
        </SharedLayout>
    );
};
export default SponsorUs;
