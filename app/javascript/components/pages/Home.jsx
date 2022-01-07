import React from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import SplashBackground from 'components/icons/SplashBackground';
import Button from 'components/Button';
import PageTitle from 'components/PageTitle';
import PodcastTile from 'components/PodcastTile';
import PodcastImage from 'images/podcast-cover.png';
import InfoCard from '../home/InfoCard';
import { infoCardData } from '../home/homeData';

import 'stylesheets/page';
import 'stylesheets/home';

let podcast = {
    tile_image: PodcastImage,
    tile_image_alt: 'Ruby on Rails Podcast',
    title: 'Ruby on Rails Podcast',
    url: 'https://www.therubyonrailspodcast.com/373',
};

const Home = () => (
    <SharedLayout>
        <div className="hero">
            <PageTitle text="WNB.rb">
                <p>A virtual community for women and non-binary Rubyists.</p>
                <a href="https://tinyurl.com/join-wnb-rb" target="_blank" rel="noreferrer noopener">
                    <Button type="secondary">Join WNB.rb</Button>
                </a>
            </PageTitle>
            <div className="hero-right">
                <SplashBackground className="splash-background" />
            </div>
        </div>
        <section className="podcast">
            <PodcastTile podcast={podcast} />
        </section>
        <div className="mx-auto max-w-3xl flex-col">
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
        </div>
    </SharedLayout>
);

export default Home;
