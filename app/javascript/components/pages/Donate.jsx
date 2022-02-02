import React, { useState, useMemo } from 'react';
import propTypes from 'prop-types';
import SharedLayout from 'components/layout/SharedLayout';
import Banner from 'components/Banner';
import Button from 'components/Button';
import PageTitleWithContainer from 'components/PageTitleWithContainer';

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
            <DonationAmounts selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice} />
            <Banner>
                Want to donate another amount?
                <Button type="white" className="ml-0 md:ml-5 mt-5 md:mt-0">
                    <a
                        href={'mailto:organizers@wnb-rb.dev'}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Contact Us
                    </a>
                </Button>
            </Banner>
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
        <div className="donation-container">
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
                                {price.value}
                            </button>
                        );
                    })}
                    <Button type="secondary" className="donate-button">
                        <a
                            href={selectedPriceObject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Donate ${selectedPriceObject.value}
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
};

DonationAmounts.propTypes = {
    selectedPrice: propTypes.number,
    setSelectedPrice: propTypes.func,
};

export default Donate;
