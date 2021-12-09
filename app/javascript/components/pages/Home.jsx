import React from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import SplashBackground from 'components/icons/SplashBackground';
import PodcastBackground from 'components/icons/PodcastBackground';
import Button from 'components/Button';
import PageTitle from 'components/PageTitle';
import PodcastTile from 'components/PodcastTile';

import 'stylesheets/page';
import 'stylesheets/home';

import PodcastImage from 'images/podcast-cover.png';

let podcast = {
    tile_image: PodcastImage,
    tile_image_alt: 'Ruby on Rails Podcast',
    title: 'Ruby on Rails Podcast',
    url: '/',
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
            <PodcastBackground className="podcast-background" />
            <PodcastTile podcast={podcast} />
        </section>
    </SharedLayout>
);

export default Home;
