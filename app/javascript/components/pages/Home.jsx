import React from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import SplashBackground from 'components/icons/SplashBackground';
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
    url: 'https://www.therubyonrailspodcast.com/373',
};

const Home = () => (
    <SharedLayout>
        <section className="hero">
            <PageTitle text="WNB.rb">
                <p>A virtual community for women and non-binary Rubyists.</p>
                <a href="https://tinyurl.com/join-wnb-rb" target="_blank" rel="noreferrer noopener">
                    <Button type="secondary">Join WNB.rb</Button>
                </a>
            </PageTitle>
            <div className="hero-right">
                <SplashBackground className="splash-background" />
            </div>
        </section>
        <section className="podcast">
            <PodcastTile podcast={podcast} />
        </section>
        <section className="bg-white">
            <div className="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2"></div>
        </section>
    </SharedLayout>
);

export default Home;
