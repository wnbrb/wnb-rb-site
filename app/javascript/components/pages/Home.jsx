import React from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import SplashBackground from 'components/icons/SplashBackground';
import Button from 'components/Button';
import PageTitle from 'components/PageTitle';
import PodcastTile from 'components/PodcastTile';
import InfoCard from '../home/InfoCard';
import SponsorsTile from 'components/SponsorsTile';

import 'stylesheets/page';
import 'stylesheets/home';

import PodcastImage from 'images/podcast-cover.png';
import Stripe from 'images/sponsors/stripe.svg';
import Shopify from 'images/sponsors/shopify.svg';
import Contentful from 'images/sponsors/contentful.svg';

import JoinOurWelcomingCommunitySection from '../home/JoinOurWelcomingCommunitySection';
import ExceedYourProfessionalGoalsSection from '../home/ExceedYourProfessionalGoalsSection';
import GiveSupportSection from '../home/GiveSupportSection';
import JoinCommunityIcon from 'components/icons/JoinCommunity';
import ExceedGoalsIcon from 'components/icons/ExceedGoals';
import GiveSupportIcon from 'components/icons/GiveSupport';

const podcast = {
    tile_image: PodcastImage,
    tile_image_alt: 'Ruby on Rails Podcast',
    title: 'Ruby on Rails Podcast',
    url: 'https://www.therubyonrailspodcast.com/373',
};

const sponsors = [
    {
        id: 1,
        tile_image: Stripe,
        tile_image_alt: 'Stripe',
    },
    {
        id: 2,
        tile_image: Shopify,
        tile_image_alt: 'Shopify',
    },
    {
        id: 3,
        tile_image: Contentful,
        tile_image_alt: 'Contentful',
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
    <SharedLayout>
        <section className="hero-container">
            <div className="hero">
                <PageTitle text="WNB.rb">
                    <p className="mt-3">A virtual community for women and non-binary Rubyists.</p>
                    <a
                        href="https://tinyurl.com/join-wnb-rb"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
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
            <PodcastTile podcast={podcast} />
        </section>

        <section className="info-card-section">
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

        <section className="sponsors">
            <SponsorsTile sponsors={sponsors} />
        </section>
    </SharedLayout>
);

export default Home;
