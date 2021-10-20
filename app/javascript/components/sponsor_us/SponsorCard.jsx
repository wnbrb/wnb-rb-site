import React from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';

const SponsorCard = ({ type, text, amount, children }) => {
    return (
        <div
            className="container max-w-xs mx-3 p-4 my-3 border-gray-200 border rounded-md shadow-lg flex flex-col justify-between"
            style={{ minHeight: '26rem' }}
        >
            <div>
                {children}
                <h3 className="text-2xl font-bold mx-2 my-3">{type} Sponsor</h3>
                <p className="m-2">{text}</p>
            </div>
            <div className="flex flex-col">
                <p className={`mx-2 my-3 text-3xl font-medium ${type.toLowerCase()}-color`}>
                    ${amount}
                </p>
                <a className="place-self-start m-2" href="mailto: womennonbinary.rb@gmail.com">
                    <Button type={`${type.toLowerCase()} justify-center`}>
                        Become {type === 'Emerald' ? 'an' : 'a'} {type} sponsor
                    </Button>
                </a>
            </div>
        </div>
    );
};

SponsorCard.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    amount: PropTypes.string,
    children: PropTypes.object,
};

export default SponsorCard;
