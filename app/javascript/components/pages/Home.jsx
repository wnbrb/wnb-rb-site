import React from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import SplashBackground from 'components/icons/SplashBackground';
import Button from 'components/Button';
import PageTitle from 'components/PageTitle';
import PodcastTile from 'components/PodcastTile';
import SponsorsTile from 'components/SponsorsTile';

import 'stylesheets/page';
import 'stylesheets/home';

import PodcastImage from 'images/podcast-cover.png';
import SponsorImage1 from 'images/sponsor1.png';
import SponsorImage2 from 'images/sponsor2.png';
import SponsorImage3 from 'images/sponsor3.png';

let podcast = {
    tile_image: PodcastImage,
    tile_image_alt: 'Ruby on Rails Podcast',
    title: 'Ruby on Rails Podcast',
    url: 'https://www.therubyonrailspodcast.com/373',
};

let sponsors = [
    {
        tile_image: SponsorImage1,
        tile_image_alt: 'Sponsor 1',
    },
    {
        tile_image: SponsorImage2,
        tile_image_alt: 'Sponsor 2',
    },
    {
        tile_image: SponsorImage3,
        tile_image_alt: 'Sponsor 3',
    },
];

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
        <section className="sponsors">
            <SponsorsTile sponsors={sponsors}/>
        </section>
    </SharedLayout>
);

export default Home;
