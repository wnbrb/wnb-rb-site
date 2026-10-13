import React from 'react';
import { Helmet } from 'react-helmet-async';

import SharedLayout from '../layout/SharedLayout';
import '../../stylesheets/about';

import OurStorySection from '../about/OurStorySection';
import CommunityLedSection from '../about/CommunityLedSection';
import BuildingForTheLongTermSection from '../about/BuildingForTheLongTermSection';
import BeyondTheNumbersSection from '../about/BeyondTheNumbersSection';
import ComeBePartOfItSection from '../about/ComeBePartOfItSection';

import jemma from 'images/Jemma Issrof.png';
import emily from 'images/Emily.jpeg';
import meetup from 'images/meetup2.jpg';
import joinUs from 'images/join-us.jpeg';

const stats = [
    { value: '2021', label: 'Started as a meetup' },
    { value: '2025', label: 'Became a nonprofit' },
    { value: '550', label: 'Members on Discord' },
    { value: '15', label: 'Leadership team' },
];

const About = () => {
    return (
        <>
            <Helmet>
                <title>About Us | WNB.rb</title>
            </Helmet>
            <SharedLayout>
                <div className="about-page">
                    <section className="about-hero">
                        <div className="about-hero-inner">
                            <h1>About WNB.rb</h1>
                            <p className="about-tagline">
                                A community by and for women and non-binary Rubyists
                            </p>
                        </div>
                    </section>

                    <section className="about-band about-band-lavender">
                        <div className="about-inner">
                            <h2 className="about-heading">It started with a DM</h2>
                            <div className="about-story-grid">
                                <div className="about-story-text">
                                    <p className="about-pullquote">
                                        In 2021, Jemma Issroff sent Emily Samp a Twitter DM.
                                    </p>
                                    <div className="about-copy">
                                        <OurStorySection />
                                    </div>
                                </div>
                                <div className="about-portraits">
                                    <figure className="about-portrait">
                                        <img src={jemma} alt="Jemma Issroff" />
                                        <figcaption>Jemma Issroff</figcaption>
                                    </figure>
                                    <figure className="about-portrait">
                                        <img src={emily} alt="Emily Samp" />
                                        <figcaption>Emily Samp</figcaption>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="about-band about-band-white">
                        <div className="about-inner about-two-col">
                            <div>
                                <h2 className="about-heading">Community-led, always</h2>
                                <div className="about-copy">
                                    <CommunityLedSection />
                                </div>
                            </div>
                            <figure className="about-figure">
                                <img src={meetup} alt="WNB.rb members together at a meetup" />
                            </figure>
                        </div>
                    </section>

                    <section className="about-band about-band-navy">
                        <div className="about-inner">
                            <h2 className="about-heading">Building for the long term</h2>
                            <div className="about-copy">
                                <BuildingForTheLongTermSection />
                            </div>
                            <dl className="about-stats">
                                {stats.map((stat) => (
                                    <div className="about-stat" key={stat.label}>
                                        <dt>{stat.value}</dt>
                                        <dd>{stat.label}</dd>
                                    </div>
                                ))}
                            </dl>
                            <div className="about-copy about-after-stats">
                                <BeyondTheNumbersSection />
                            </div>
                        </div>
                    </section>

                    <section className="about-band about-band-yellow about-cta">
                        <div className="about-inner about-two-col">
                            <div>
                                <h2 className="about-heading">Come be part of it</h2>
                                <div className="about-copy">
                                    <ComeBePartOfItSection />
                                </div>
                                <div className="about-cta-links">
                                    <a href="/join-us" className="about-cta-button primary">
                                        Join WNB.rb
                                    </a>
                                    <a href="/community" className="about-cta-button secondary">
                                        Explore our community
                                    </a>
                                </div>
                            </div>
                            <figure className="about-figure">
                                <img src={joinUs} alt="WNB.rb community members" />
                            </figure>
                        </div>
                    </section>
                </div>
            </SharedLayout>
        </>
    );
};

export default About;
