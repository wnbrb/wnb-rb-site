import React from 'react';
import Button from '../Button';

const SponsorCTA = () => {
    return (
        <div className="sponsor-cta">
            <div className="item-wrapper">
                <h3 className="text-2xl text-center font-medium m-1">
                    Interested in sponsoring WNB.rb?
                </h3>
                <a href="mailto: organizers@wnb-rb.dev">
                    <Button type="secondary text-xl">Contact Us</Button>
                </a>
            </div>
        </div>
    );
};

export default SponsorCTA;
