import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import propTypes from 'prop-types';
import SharedLayout from 'components/layout/SharedLayout';
import Banner from 'components/Banner';
import Button from 'components/Button';
import PageTitleWithContainer from 'components/PageTitleWithContainer';
import { donationAmounts } from 'datasources';

import 'stylesheets/donate';

const Donate = () => {
    const startingPrice = 200;
    const [selectedPrice, setSelectedPrice] = useState(startingPrice);

    return (
        <>
            <Helmet>
                <title>Donate | WNB.rb</title>
            </Helmet>

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
                            Donating to WNB.rb enables us to invest more resources in supporting
                            women and non-binary people in the Ruby community.
                        </p>
                        <p>
                            Here are some of the initiatives we plan to launch in 2022 with your
                            help:
                        </p>
                        <ul className="list-disc ml-10">
                            <li>Community fund for educational materials</li>
                            <li>Travel and housing scholarships for RubyConf and RailsConf</li>
                            <li>
                                Workshops for community members on topics such as salary
                                negotiation, resume writing, and more!
                            </li>
                        </ul>
                    </div>
                </div>
                <OtherAmountBanner />
            </SharedLayout>
        </>
    );
};

const DonationAmounts = ({ selectedPrice, setSelectedPrice }) => {
    const prices = useMemo(() => donationAmounts(process.env.NODE_ENV), []);

    const selectedPriceObject = useMemo(() => {
        return prices.filter((price) => {
            return price.value === selectedPrice;
        })[0];
    }, [prices, selectedPrice]);

    const [otherSelected, setOtherSelected] = useState(false);

    const donateOtherHandler = () => {};

    const selectSetPrice = (value) => {
        setSelectedPrice(value);
        setOtherSelected(false);
    };

    return (
        <div className="flex justify-center">
            <div className="donation-amounts">
                {prices.map((price) => {
                    return (
                        <button
                            key={price.value}
                            className={`donation-amount ${
                                selectedPrice === price.value && !otherSelected ? 'selected' : null
                            }`}
                            onClick={() => selectSetPrice(price.value)}
                        >
                            ${price.value.toLocaleString()}
                        </button>
                    );
                })}
                <form
                    className={`donation-amount flex-col p-1 ${otherSelected ? 'selected' : null}`}
                >
                    <label htmlFor="other">Other</label>
                    <input
                        id="other"
                        type="text"
                        className="max-w-full m-0 p-1"
                        onClick={() => setOtherSelected(true)}
                    />
                </form>
                {!otherSelected && (
                    <Button type="secondary" className="donate-button">
                        <a
                            href={selectedPriceObject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Donate ${selectedPriceObject.value.toLocaleString()}
                        </a>
                    </Button>
                )}
                {otherSelected && (
                    <button className="button secondary donate-button" onClick={donateOtherHandler}>
                        Donate
                    </button>
                )}
            </div>
        </div>
    );
};

const OtherAmountBanner = () => {
    return (
        <Banner>
            Interested in donating a different amount?
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
