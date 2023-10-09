import React from 'react';
import { Helmet } from 'react-helmet';
import SharedLayout from 'components/layout/SharedLayout';
import SplashBackground from 'components/icons/SplashBackground';
import Button from 'components/Button';
import PageTitle from 'components/PageTitle';
import PodcastTile from 'components/PodcastTile';
import InfoCard from '../home/InfoCard';

import 'stylesheets/home';

import PodcastImageRubyonRails from 'images/podcast-ruby-on-rails.png';
import PodcastImageRemoteRuby from 'images/podcast-remote-ruby.png';

import JoinOurWelcomingCommunitySection from '../home/JoinOurWelcomingCommunitySection';
import ExceedYourProfessionalGoalsSection from '../home/ExceedYourProfessionalGoalsSection';
import GiveSupportSection from '../home/GiveSupportSection';
import JoinCommunityIcon from 'components/icons/JoinCommunity';
import ExceedGoalsIcon from 'components/icons/ExceedGoals';
import GiveSupportIcon from 'components/icons/GiveSupport';

const podcasts = [
    {
        id: 1,
        tile_image: PodcastImageRubyonRails,
        tile_image_alt: 'Ruby on Rails Podcast',
        title: 'Ruby on Rails Podcast',
        url: 'https://www.therubyonrailspodcast.com/373',
    },
    {
        id: 2,
        tile_image: PodcastImageRemoteRuby,
        tile_image_alt: 'Remote Ruby Podcast',
        title: 'Remote Ruby',
        url: 'https://remoteruby.com/162',
    },
];

const infoCardData = [
    {
        title: 'Join our welcoming community',
        section: <JoinOurWelcomingCommunitySection />,
        icon: JoinCommunityIcon,
    },
    {
        title: 'Exceed your professional goals',
        section: <ExceedYourProfessionalGoalsSection />,
        icon: ExceedGoalsIcon,
    },
    {
        title: 'Give support, and get it in return',
        section: <GiveSupportSection />,
        icon: GiveSupportIcon,
    },
];

const Home = () => (
    <>
        <Helmet>
            <title>WNB.rb: A Virtual Community for Women and Non-Binary Rubyists</title>
        </Helmet>

        <SharedLayout>
            <section className="hero-container">
                <div className="hero">
                    <PageTitle text="WNB.rb" altText="Women and Non-Binary Rubyists">
                        <p className="mt-3 max-w-[14rem]">
                            A virtual community for women and non-binary Rubyists.
                        </p>
                        <a href="/join-us">
                            <Button type="secondary" className="mt-3">
                                Join WNB.rb
                            </Button>
                        </a>
                    </PageTitle>
                    <div className="splash-background">
                        <SplashBackground className="w-full" />
                    </div>
                </div>
            </section>

            <section className="podcast">
                <PodcastTile podcasts={podcasts} />
            </section>

            <section className="info-card-section mb-12">
                {infoCardData.map((card) => {
                    return (
                        <InfoCard
                            key={card.title}
                            section={card.section}
                            title={card.title}
                            icon={card.icon}
                        ></InfoCard>
                    );
                })}
            </section>
        </SharedLayout>
    </>
);

export default Home;
