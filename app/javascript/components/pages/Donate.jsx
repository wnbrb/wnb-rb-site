import React, { useState, useMemo } from 'react';
import propTypes from 'prop-types';
import SharedLayout from 'components/layout/SharedLayout';
import Banner from 'components/Banner';
import Button from 'components/Button';
import PageTitleWithContainer from 'components/PageTitleWithContainer';

import 'stylesheets/page';
import 'stylesheets/donate';

const PRICES = [
    // TEST VALUES

    { value: 10, link: 'https://buy.stripe.com/test_fZe3cr0hWfIN0i4289' },
    { value: 25, link: 'https://buy.stripe.com/test_14k3crfcQaot7Kw6oq' },
    { value: 50, link: 'https://buy.stripe.com/test_6oEaET9Sw1RXfcY8wz' },
    { value: 75, link: 'https://buy.stripe.com/test_8wM28n4yc7chfcY007' },
    { value: 100, link: 'https://buy.stripe.com/test_14k14je8MgMRd4Q3cc' },
    { value: 200, link: 'https://buy.stripe.com/test_fZe8wL8Os0NT9SEeUY' },
    { value: 500, link: 'https://buy.stripe.com/test_bIYfZdggU1RX9SE5kp' },
    { value: 1000, link: 'https://buy.stripe.com/test_9AQfZd0hWdAF1m8cMS' },
];

const Donate = () => {
    const [selectedPrice, setSelectedPrice] = useState(100);

    return (
        <SharedLayout>
            <PageTitleWithContainer text="Donate" />
            <div className="flex flex-row p-12 justify-center flex-wrap">
                <div className="flex flex-col mb-20 md:mb-0 md:mr-20">
                    <h2 className="text-2xl font-medium mb-8">Choose a donation amount</h2>
                    <DonationAmounts
                        selectedPrice={selectedPrice}
                        setSelectedPrice={setSelectedPrice}
                    />
                </div>
                <div className="max-w-[25rem]">
                    <h2 className="text-2xl font-medium mb-8">Why give to WNB.rb?</h2>
                    <p className="mb-5">
                        Donating to WNB.rb enables us to invest more resources in supporting women
                        and non-binary people in the Ruby community.
                    </p>
                    <p>
                        Here are some of the initiatives we plan to launch in 2022 with your help:
                    </p>
                    <ul className="list-disc ml-10">
                        <li>Community fund for educational materials</li>
                        <li>Full scholarships to RubyConf and RailsConf</li>
                        <li>Open source development stipends</li>
                    </ul>
                </div>
            </div>
            <OtherAmountBanner />
        </SharedLayout>
    );
};

const DonationAmounts = ({ selectedPrice, setSelectedPrice }) => {
    const selectedPriceObject = useMemo(() => {
        return PRICES.filter((price) => {
            return price.value === selectedPrice;
        })[0];
    }, [selectedPrice]);

    return (
        <div className="flex justify-center">
            <div className="donation-amounts">
                {PRICES.map((price) => {
                    return (
                        <button
                            key={price.value}
                            className={`donation-amount ${
                                selectedPrice === price.value ? 'selected' : null
                            }`}
                            onClick={() => setSelectedPrice(price.value)}
                        >
                            ${price.value.toLocaleString()}
                        </button>
                    );
                })}
                <Button type="secondary" className="donate-button">
                    <a href={selectedPriceObject.link} target="_blank" rel="noopener noreferrer">
                        Donate ${selectedPriceObject.value.toLocaleString()}
                    </a>
                </Button>
            </div>
        </div>
    );
};

const OtherAmountBanner = () => {
    return (
        <Banner>
            Interested in donating another amount?
            <Button type="white" className="ml-0 md:ml-5 mt-5 md:mt-0">
                <a href={'mailto:organizers@wnb-rb.dev'} target="_blank" rel="noopener noreferrer">
                    Contact Us
                </a>
            </Button>
        </Banner>
    );
};

DonationAmounts.propTypes = {
    selectedPrice: propTypes.number,
    setSelectedPrice: propTypes.func,
};

export default Donate;
