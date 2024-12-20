import React from 'react';
import { Helmet } from 'react-helmet-async';
import SharedLayout from 'components/layout/SharedLayout';
import SplashBackground from 'components/icons/SplashBackground';
import Button from 'components/Button';
import PageTitle from 'components/PageTitle';

import fifth from '../../../assets/images/fifth.jpeg';
import Euruko2022 from '../../../assets/images/Euruko2022.jpeg';
import Berlin from '../../../assets/images/Berlin2023.jpeg';

import kaigi from '../../../assets/images/kaigi.jpeg';
import London2023 from '../../../assets/images/London2023.jpeg';
import Fatuma from '../../../assets/images/Fatuma1.jpg';

import line2 from '../../../assets/images/line2.svg';
import 'stylesheets/home';
import JoinOurWelcomingCommunitySection from '../home/JoinOurWelcomingCommunitySection';
import ExceedYourProfessionalGoalsSection from '../home/ExceedYourProfessionalGoalsSection';
import GiveSupportSection from '../home/GiveSupportSection';
import line from '../../../assets/images/line.svg';
import { useMediaQuery } from 'react-responsive';
import Meetspeak from '../MeetSpeak';
import Hire from '../Hire';
import Thankyou from '../Thankyou';

const Home = () => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const infoCardData = [
        {
            title: 'Join our welcoming community',
            section: <JoinOurWelcomingCommunitySection />,
            backgroundColor: 'bg-color-1',
        },
        {
            title: 'Give support, and get it in return',
            section: <GiveSupportSection />,
            backgroundColor: 'bg-color-3',
        },
        {
            title: 'Exceed your professional goals',
            section: <ExceedYourProfessionalGoalsSection />,
            backgroundColor: 'bg-color-2',
        },

        {
            image: isMobile ? Fatuma : isTablet ? fifth  : Euruko2022 ,
        },
        {
            image: isMobile ? London2023 : isTablet ? kaigi : Berlin,
        },
    ];
    return (
        <>
            <Helmet>
                <title>WNB.rb: A Virtual Community for Women and Non-Binary Rubyists</title>
            </Helmet>

            <SharedLayout>
                <section className="hero-container mt-2rem">
                    <div className="work-in-progress">
                        <h1 className='font-besley text-lg'>🚧 Website Redesign in Progress 🚧</h1>
                        <p className='font-besley text-base'>You might spot old branding, broken links, or other inconsistencies. We're on it!</p>
                        </div>
                    <div className="hero">
                        <div className="splash-background">
                            <SplashBackground className="w-full" />
                        </div>
                        <PageTitle>
                            <a href="/join-us">
                                <Button type="secondary" className="mt-3">
                                    Join WNB.rb
                                </Button>
                            </a>
                        </PageTitle>
                    </div>
                </section>

                <div className="info">
                    <section className="info-layout">
                        <img src={line2} className="line2" alt="horizontal line" />
                        <div className="info-card-section mb-12 layout ">
                            {infoCardData.map((card, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`info-card ${
                                            card.backgroundColor ? card.backgroundColor : ''
                                        }`}
                                    >
                                        {/* Render title and text */}
                                        {card.title && card.section && (
                                            <>
                                                <h2 className="text-xl font-bold">{card.title}</h2>
                                                <div>{card.section}</div>
                                            </>
                                        )}

                                        {/* Render image only */}
                                        {card.image && (
                                            <img
                                                src={card.image}
                                                alt={`Card ${index + 1}`}
                                                className={`info-card-image ${
                                                    index === 1 ? 'second-card-image' : ''
                                                }`}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                    <img src={line} className="line" alt="horizontal line" />
                </div>

                <section className="meetspeak">
                    <Meetspeak />
                </section>

                <section>
                    <Hire />
                </section>

                <section>
                    <Thankyou />
                </section>
            </SharedLayout>
        </>
    );
};

export default Home;
