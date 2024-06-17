import React from 'react';
import { Helmet } from 'react-helmet-async';
import SharedLayout from 'components/layout/SharedLayout';
import PageTitleWithContainer from 'components/PageTitleWithContainer';

const SponsorUs = () => (
    <>
        <Helmet>
            <title>Sponsor Us | WNB.rb</title>
        </Helmet>

        <SharedLayout>
            <PageTitleWithContainer text="Sponsor Us" />
            <div className="-mt-8">
                <stripe-pricing-table
                    pricing-table-id="prctbl_1PSlcMBHbLqUjvnWol3sB6vA"
                    publishable-key="pk_live_51JmdS1BHbLqUjvnWRLnx9KBZtHWLWHe67N3OpsV0FERko2K4lAZ6oyEo4pIq84YIMQPUJ8K1FY1UevXjZZPsiloq00EYai7JBQ"
                />
            </div>
        </SharedLayout>
    </>
);

export default SponsorUs;
