import React from 'react';
import Rubies from './icons/Rubies';
import Button from './Button';

const SponsorCard = () => {
    return (
        <div
            className="container max-w-xs mx-auto p-4 mt-2 border-gray-200 border rounded-md shadow-lg flex flex-col justify-between"
            style={{ height: '26rem' }}
        >
            <div>
                <Rubies className="Rubies mx-auto p-2" />
                <h3 className="text-2xl font-bold mx-2 my-3">Ruby Sponsor</h3>
                <p className="m-2">
                    Provide books for all members of WNB.rb’s book club who would not otherwise be
                    able to afford them.
                </p>
            </div>
            <div className="flex flex-col">
                <p className="mx-2 my-3 text-3xl font-medium" style={{ color: '#993232' }}>
                    $2,000
                </p>
                <a className="place-self-start m-2" href="mailto: womennonbinary.rb@gmail.com">
                    <Button type="ruby justify-center">Become a Ruby sponsor</Button>
                </a>
            </div>
        </div>
    );
};

export default SponsorCard;
