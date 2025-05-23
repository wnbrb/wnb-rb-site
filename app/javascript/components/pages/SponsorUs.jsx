import React from 'react';
import { Helmet } from 'react-helmet-async';
import SharedLayout from 'components/layout/SharedLayout';
import Card from 'components/Card';
import Button from 'components/Button';
import { Check } from 'lucide-react';
import 'stylesheets/support-us';
import Berlin2023 from '../../../assets/images/Berlin.jpeg';
import four from '../../../assets/images/four.jpg';

const SponsorUs = () => {
    return (
        <>
            <Helmet>
                <title>Support Us | WNB.rb</title>
            </Helmet>

            <SharedLayout>
                <div className="title">
                    <h1 className="font-syne">Support us</h1>
                    <p>
                        By supporting WNB.rb, you&apos;re investing in a global community where
                        women and non-binary people thrive in the Ruby ecosystem. Your sponsorship
                        helps us host meetups, run mentorship programs, and create safe, empowering
                        spaces for learning and growth. Together, we&apos;re shaping a more
                        inclusive future in tech.
                    </p>
                </div>

                <section className="tiers container mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4l">
                    <div className="opal border p-6 rounded-2xl shadow hover:shadow-lg transition h-full">
                        <h2 className="text-3xl md:text-2xl sm:text-2xl lg:w-[60%] font-bold mb-4 font-besley mx-auto">
                            Opal Sponsorship
                        </h2>
                        <p className="mb-4 font-noto">
                            Help WNB.rb pay for web hosting and other administrative expenses.
                        </p>
                        <div className="flex flex-col mb-4">
                            <span className="text-3xl font-bold font-besley">$1,000</span>{' '}
                            <span className=" text-base">per year</span>
                        </div>
                        <Button
                            type="primary"
                            className="font-bold mx-auto w-[8rem]"
                            onClick={() => {
                                window.location.href =
                                    'https://checkout.stripe.com/c/pay/cs_live_a1p8Hf9JETyLoMzmAf1ru22zVVEelTamMDAsE2BOMQUMOod1uvTng2A9FU#fidkdWxOYHwnPyd1blppbHNgWjA0T2hhVjRHTWdJdFBvc2tSV0lrfTxOR19xTVJJUk1gMzJLNkp1dlM1Q0BXbmo3TjFpRF8zanxAajF1THQ9MVxMSFRVUE89TjRDXDRQYHNdb19fVXZsaWp0NTVAXGRsMk9HVCcpJ3ZwZ3Zmd2x1cWxqa1BrbHRwYGtgdnZAa2RnaWBhJz9jZGl2YHgl';
                            }}
                        >
                            Subscribe
                        </Button>
                        <ul className="mt-6 text-sm flex font-noto">
                            <li className="flex gap-2 items-start">
                                <Check size={20} className="text-black mt-1" />
                                <span>Feature your company&apos;s logo on the WNB.rb website</span>
                            </li>
                        </ul>
                    </div>

                    <div className="sapphire border p-6 rounded-2xl shadow hover:shadow-lg transition h-full">
                        <div className="most-popular-banner  text-black font-semibold mx-auto rounded">
                            Most popular
                        </div>
                        <h2 className="text-3xl md:text-2xl sm:text-2xl font-bold mb-4 font-besley">
                            Sapphire Sponsorship
                        </h2>
                        <p className="mb-4 font-noto">
                            Support community organization like our meetup & book club.
                        </p>
                        <div className="flex flex-col mb-4">
                            <span className="text-3xl font-bold font-besley">$2,500</span>
                            <span className="text-base">per year</span>
                        </div>
                        <Button
                            type="primary"
                            className="font-bold mx-auto w-[8rem]"
                            onClick={() => {
                                window.location.href =
                                    'https://checkout.stripe.com/c/pay/cs_live_a1Nu8jBYR28iRhVn0QXpNE7srUvcWwTYLlxFbKadLuOcELMqMJB2e50TCX#fidkdWxOYHwnPyd1blppbHNgWjA0T2hhVjRHTWdJdFBvc2tSV0lrfTxOR19xTVJJUk1gMzJLNkp1dlM1Q0BXbmo3TjFpRF8zanxAajF1THQ9MVxMSFRVUE89TjRDXDRQYHNdb19fVXZsaWp0NTVAXGRsMk9HVCcpJ3ZwZ3Zmd2x1cWxqa1BrbHRwYGtgdnZAa2RnaWBhJz9jZGl2YHgl';
                            }}
                        >
                            Subscribe
                        </Button>

                        <ul className="mt-6 text-sm space-y-2 font-noto">
                            <li className="flex gap-2 items-start">
                                <Check size={20} className="text-black mt-1" />
                                <span>Feature your company&apos;s logo on the WNB.rb website</span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <Check size={20} className="text-black mt-1" />
                                <span>Post unlimited jobs on our internal job board</span>
                            </li>
                        </ul>
                    </div>

                    <div className="emerald border p-6 rounded-2xl shadow hover:shadow-lg transition h-full">
                        <h2 className="text-3xl md:text-2xl sm:text-2xl font-bold mb-4 font-besley">
                            Emerald Sponsorship
                        </h2>
                        <p className="mb-4 font-noto">
                            Help send WNB.rb members to Ruby conferences globally.
                        </p>
                        <div className="flex flex-col mb-4">
                            <span className="text-3xl font-bold font-besley">$5,000</span>
                            <span className="text-base">per year</span>
                        </div>

                        <Button
                            type="primary"
                            className="font-bold mx-auto w-[8rem]"
                            onClick={() => {
                                window.location.href =
                                    'https://checkout.stripe.com/c/pay/cs_live_a1GL1pE1nzMAztazV8Rjk5eocCa3H7ICuQPKPCWR8fCCZ0A2vx07bKKHjS#fidkdWxOYHwnPyd1blppbHNgWjA0T2hhVjRHTWdJdFBvc2tSV0lrfTxOR19xTVJJUk1gMzJLNkp1dlM1Q0BXbmo3TjFpRF8zanxAajF1THQ9MVxMSFRVUE89TjRDXDRQYHNdb19fVXZsaWp0NTVAXGRsMk9HVCcpJ3ZwZ3Zmd2x1cWxqa1BrbHRwYGtgdnZAa2RnaWBhJz9jZGl2YHgl';
                            }}
                        >
                            Subscribe
                        </Button>

                        <ul className="mt-6 text-sm space-y-2 font-noto">
                            <li className="flex gap-2 items-start">
                                <Check size={20} className="text-black mt-1" />
                                <span>Feature your company&apos;s logo on the WNB.rb website</span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <Check size={20} className="text-black mt-1" />
                                <span>Post unlimited jobs on our internal job board</span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <Check size={20} className="text-black mt-1" />
                                <span>Make announcements at our monthly meetup</span>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="bg-wnbrb-pink-light">
                    <div className="container  mx-auto flex flex-col md:flex-col md:items-center lg:items-baseline lg:flex-row gap-8  py-[4rem]  lg:px-8 xl:px-12">
                        <Card className="w-100 md:w-1/2 flex-1 flex flex-col h-full">
                            <img
                                className="card-img"
                                src={Berlin2023}
                                alt="Wnbrb community members"
                            />
                            <h2 className="text-3xl text-center font-syne font-bold text-wnbrb-blue-navy">
                                Hire from WNB.rb
                            </h2>
                            <p className="mb-2 text-wnbrb-blue-navy text-center sm:w-[95%]">
                                Even if you aren&apos;t a sponsor, you can hire from our community
                                by posting your open jobs on our job board.
                            </p>
                            <a
                                href="https://buy.stripe.com/28o4gW9cZ7oKbwQ7sJ"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button type="primary" className="max-w-[8rem] lg:mt-[32px] ">
                                    Post a job
                                </Button>
                            </a>
                        </Card>

                        <Card className="w-100 md:w-1/2 flex-1 flex flex-col h-full">
                            <img className="card-img" src={four} alt="WNBrb community members" />
                            <h2 className="text-3xl text-center font-syne font-bold mb-2 text-wnbrb-blue-navy">
                                Make a donation
                            </h2>
                            <p className="mb-2 grow text-center w-[83%] text-wnbrb-blue-navy">
                                Not ready to sponsor WNB.rb? That&apos;s okay! We&apos;d still
                                greatly appreciate a donation of any amount. All the money we earn
                                goes back into the community.
                            </p>
                            <a
                                href="https://buy.stripe.com/aEU3cS3SF9wS0ScdR5"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button type="primary" className="max-w-[8rem] ">
                                    Donate
                                </Button>
                            </a>
                        </Card>
                    </div>
                </section>
            </SharedLayout>
        </>
    );
};

export default SponsorUs;
