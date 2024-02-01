import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import propTypes from 'prop-types';
import SharedLayout from 'components/layout/SharedLayout';
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

    const [customSelected, setCustomSelected] = useState(false);
    const [customAmount, setCustomAmount] = useState('');

    const inputHandler = (e) => {
        const input = e.target.value;
        setCustomAmount(input);
    };

    const donateOtherHandler = () => {
        if (!isValidNumber(customAmount)) return;

        const newWindow = window.open('', '_blank');
        const body = { price: customAmount };

        const fetchCheckoutUrl = async () => {
            const result = await fetch('/api/donations', {
                method: 'POST',
                headers: {
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (result.status === 200) {
                const json = await result.json();
                setCustomSelected(false);
                setCustomAmount('');
                newWindow.location = json.url;
            }
        };

        fetchCheckoutUrl();
    };

    const selectSetPrice = (value) => {
        setSelectedPrice(value);
        setCustomSelected(false);
    };

    const isWholeNumber = (value) => {
        return /^\d{1,}$/.test(value);
    };

    const isValidNumber = (value) => {
        return isWholeNumber(value) && parseInt(customAmount, 10) > 0;
    };

    const customAmtButtonText = () => {
        return isValidNumber(customAmount)
            ? `Donate $${parseInt(customAmount, 10).toLocaleString()}`
            : customAmount === '' || customAmount === '0'
            ? 'Donate'
            : 'Please enter a dollar amount';
    };

    return (
        <div className="flex justify-center">
            <div className="donation-amounts">
                {prices.map((price) => {
                    return (
                        <button
                            key={price.value}
                            className={`donation-amount ${
                                selectedPrice === price.value && !customSelected ? 'selected' : null
                            }`}
                            onClick={() => selectSetPrice(price.value)}
                        >
                            ${price.value.toLocaleString()}
                        </button>
                    );
                })}
                <form
                    className={`donation-amount flex-col p-1 ${customSelected ? 'selected' : null}`}
                >
                    <label htmlFor="other">Other</label>
                    <input
                        id="other"
                        type="text"
                        className="max-w-full m-0 p-1"
                        onClick={() => setCustomSelected(true)}
                        onKeyDown={() => setCustomSelected(true)}
                        value={customAmount}
                        onChange={inputHandler}
                    />
                </form>
                {!customSelected && (
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
                {customSelected && (
                    <button className="button secondary donate-button" onClick={donateOtherHandler}>
                        {customAmtButtonText()}
                    </button>
                )}
            </div>
        </div>
    );
};

DonationAmounts.propTypes = {
    selectedPrice: propTypes.number,
    setSelectedPrice: propTypes.func,
};

export default Donate;
