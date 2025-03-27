import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
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
import Meetspeak from '../MeetSpeak';
import Hire from '../Hire';
import Thankyou from '../Thankyou';

const Home = () => {
    const [device, setDevice] = useState('desktop');
    useEffect(() => {
        const updateDevice = () => {
            if (window.innerWidth <= 767) {
                setDevice('mobile');
            } else if (window.innerWidth > 767 && window.innerWidth <= 1023) {
                setDevice('tablet');
            } else {
                setDevice('desktop');
            }
        };
        window.addEventListener('resize', updateDevice);
        updateDevice();
        return () => window.removeEventListener('resize', updateDevice);
    }, []);
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
            image: device === 'mobile' ? Fatuma : device === 'tablet' ? fifth : Euruko2022,
        },
        {
            image: device === 'mobile' ? London2023 : device === 'tablet' ? kaigi : Berlin,
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
                        <h1 className="font-besley text-base md:text-lg lg:text-lg">
                            🚧 Website Redesign in Progress 🚧
                        </h1>
                        <p className="font-besley text-base">
                            You might spot old branding, broken links, or other inconsistencies.
                            We&apos;re on it!
                        </p>
                    </div>
                    <div className="hero">
                        <div className="splash-background">
                            <SplashBackground className="w-full" />
                        </div>
                        <PageTitle text="Wnb.rb" altText="Women and Non-Binary Rubyists">
                            <p className="mt-8 font-syne text-base font-semibold">
                                A virtual community for women & non-binary Rubyists.
                            </p>

                            <a href="/join-us">
                                <Button type="primary" className="mt-3  font-bold">
                                    Join WNB.rb
                                </Button>
                            </a>
                        </PageTitle>
                    </div>
                </section>

                <div className="info">
                    <section className="info-layout">
                        <img src={line} className="line" alt="horizontal line" />
                        <div className="info-card-section layout ">
                            {infoCardData.map((card, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`info-card ${
                                            card.backgroundColor ? card.backgroundColor : ''
                                        }`}
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
                    <img src={line2} className="line2" alt="horizontal line" />
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
