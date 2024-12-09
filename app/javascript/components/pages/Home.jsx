import React from 'react';
import { Helmet } from 'react-helmet-async';
import SharedLayout from 'components/layout/SharedLayout';
import SplashBackground from 'components/icons/SplashBackground';
import Button from 'components/Button';
import PageTitle from 'components/PageTitle';
import PodcastTile from 'components/PodcastTile';
import InfoCard from '../home/InfoCard';
import img1 from '../../../assets/images/img1.png';
import img2 from '../../../assets/images/img2.svg';
import mobImg1 from '../../../assets/images/mobImg1.png';
import mobImg2  from '../../../assets/images/mobImg2.png';
import tabImg1  from '../../../assets/images/tabimg1.png';
import tabImg2  from '../../../assets/images/tabimg2.png';

import line2 from '../../../assets/images/line2.svg';
import 'stylesheets/home';
import JoinOurWelcomingCommunitySection from '../home/JoinOurWelcomingCommunitySection';
import ExceedYourProfessionalGoalsSection from '../home/ExceedYourProfessionalGoalsSection';
import GiveSupportSection from '../home/GiveSupportSection';
import line from '../../../assets/images/line.svg';
import { useMediaQuery } from 'react-responsive';
import Meetspeak from '../MeetSpeak';
import Hire from '../Hire';



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
            image: isMobile ? mobImg1: isTablet ? tabImg1 : img1,
             },
        {
            image: isMobile ? mobImg2: isTablet ? tabImg2 : img2,

            
        }
    ];
    return(
    <>
        <Helmet>
            <title>WNB.rb: A Virtual Community for Women and Non-Binary Rubyists</title>
        </Helmet>

        <SharedLayout>
            <section className="hero-container mt-2rem">
                <div className="hero">
                    <div className="splash-background">
                        <SplashBackground className="w-full" />                 
                    </div>
                    <PageTitle >
                      
                        <a href="/join-us">
                            <Button type="secondary" className="mt-3">
                                Join WNB.rb
                            </Button>
                        </a>
                    </PageTitle>
                      
                </div>
                <img src={line} className="line" alt='horizontal line'/>
            </section>

 
            <div className="info">
                <section className="info-layout">
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
                                        className="info-card-image"
                                    />
                                )}
                            </div>
                        );
                    })}
                    </div>
                </section>
                <img src={line2} className="line" alt='horizontal line'/>
            </div>
                  
           <section className='meetspeak'>
                        <Meetspeak/>
             </section>

                    <section>
                        <Hire />
                    </section>
         
        </SharedLayout>
    </>
);
}

export default Home;
