import React from 'react';
import { Helmet } from 'react-helmet-async';
import SharedLayout from 'components/layout/SharedLayout';
import PageTitleWithContainer from 'components/PageTitleWithContainer';
import Card from 'components/Card';
import Button from 'components/Button';

const SponsorUs = () => (
    <>
        <Helmet>
            <title>Sponsor Us | WNB.rb</title>
        </Helmet>

        <SharedLayout>
            <PageTitleWithContainer text="Sponsor Us" />
            <div className="container flex flex-col mx-auto md:max-w-[50rem] lg:max-w-[60rem]">
                <section className="sponsorship-options">
                    <h2 className="text-2xl font-bold my-2">Sponsorship tiers</h2>

                    <stripe-pricing-table
                        pricing-table-id="prctbl_1PSlcMBHbLqUjvnWol3sB6vA"
                        publishable-key="pk_live_51JmdS1BHbLqUjvnWRLnx9KBZtHWLWHe67N3OpsV0FERko2K4lAZ6oyEo4pIq84YIMQPUJ8K1FY1UevXjZZPsiloq00EYai7JBQ"
                    />
                </section>

                <hr className="my-12 mx-48" />

                <div className="flex flex-row justify-between items-center space-x-5 mb-12 mt-2">
                    <Card className="max-w-[35rem] min-h-[17rem]">
                        <h2 className="text-2xl font-bold mb-2">Hire from WNB.rb</h2>
                        <p className="mb-8">
                            Even if you aren&apos;t a sponsor, you can hire from our community by
                            posting your open jobs on our job board.
                        </p>
                        <a
                            href="https://buy.stripe.com/28o4gW9cZ7oKbwQ7sJ"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button type="primary" className="max-w-[8rem]">
                                Post a job
                            </Button>
                        </a>
                    </Card>

                    <Card className="max-w-[30rem] min-h-[17rem]">
                        <h2 className="text-2xl font-bold mb-2">Make a donation</h2>
                        <p className="mb-8">
                            Not ready to sponsor WNB.rb? That&apos;s okay! We&apos;d still greatly
                            appreciate a donation of any amount. All the money we earn goes back
                            into the community.
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
            </div>
        </SharedLayout>
    </>
);

export default SponsorUs;
