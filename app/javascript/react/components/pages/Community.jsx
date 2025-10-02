import React from 'react';
import { Helmet } from 'react-helmet-async';

import SharedLayout from '../layout/SharedLayout';
import '../../stylesheets/home.scss';
import '../../stylesheets/community.scss';

import OurCommunitySection from '../community/OurCommunitySection';
import AdviceSection from '../community/AdviceSection';
import CodeofConductSection from '../community/CodeofConductSection';
import CFPWorkingGroupSection from '../community/CFPWorkingGroupSection';
import BookClubSection from '../community/BookClubSection';
import InPersonConferenceMeetupsSection from '../community/In-PersonConferenceMeetupsSection';
import InterviewPrepSection from '../community/InterviewPrepSection';

const Community = () => {
    const section1Data = [
        {
            title: 'Our Community',
            section: <OurCommunitySection />,
            backgroundColor: 'bg-color-community',
        },
    ];

    const infoCardData = [
        {
            title: 'Advice',
            section: <AdviceSection />,
            backgroundColor: 'bg-color-3',
        },
        {
            title: 'Book Club',
            section: <BookClubSection />,
            backgroundColor: 'bg-color-1',
        },
        {
            title: 'CFP Working Group',
            section: <CFPWorkingGroupSection />,
            backgroundColor: 'bg-color-2',
        },
        {
            title: 'In-Person Conference Meetups',
            section: <InPersonConferenceMeetupsSection />,
            backgroundColor: 'bg-color-1',
        },
        {
            title: 'Code of Conduct',
            section: <CodeofConductSection />,
            backgroundColor: 'bg-color-3',
        },
        {
            title: 'Jobs & Interview Prep',
            section: <InterviewPrepSection />,
            backgroundColor: 'bg-color-2',
        },
    ];

    return (
        <>
            <Helmet>
                <title>Our Community</title>
            </Helmet>
            <SharedLayout>
                <div className="community-section">
                    <div className="community">
                        {section1Data.map((card, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`info-card ${
                                        card.backgroundColor ? card.backgroundColor : ''
                                    }`}
                                >
                                    {card.title && card.section && (
                                        <>
                                            <h2 className="font-bold font-syne">{card.title}</h2>
                                            <div className="font-noto text-base">
                                                {card.section}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="info">
                    <section className="info-layout">
                        <div className="info-card-section layout section-cards">
                            {infoCardData.map((card, index) => (
                                <div
                                    key={index}
                                    className={`info-card ${card.backgroundColor || ''}`}
                                >
                                    {card.title && card.section && (
                                        <>
                                            <h2 className="text-xl font-bold font-syne">
                                                {card.title}
                                            </h2>
                                            <div className="font-noto text-base">
                                                {card.section}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </SharedLayout>
        </>
    );
};

export default Community;
