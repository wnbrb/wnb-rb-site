import React from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import RubyOutline from 'components/icons/RubyOutline';
import SplashBackground from 'components/icons/SplashBackground';
import Button from 'components/Button';

import 'stylesheets/page';
import 'stylesheets/home';

const Home = () => (
    <SharedLayout>
        <div className="hero">
            <div className="hero-left">
                <RubyOutline className="ruby-outline" />

                <div className="hero-cta">
                    <h1>WNB.rb</h1>
                    <p>A virtual community for women and non-binary Rubyists.</p>
                    <a
                        href="https://tinyurl.com/join-wnb-rb"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <Button type="secondary">Join WNB.rb</Button>
                    </a>
                </div>
            </div>

            <div className="hero-right">
                <SplashBackground className="splash-background" />
            </div>
        </div>
    </SharedLayout>
);

export default Home;
