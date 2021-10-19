import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

const SponsorCard = ({ type, text, amount, icon }) => {
    return (
        <div
            className="container max-w-xs mx-3 p-4 mt-2 border-gray-200 border rounded-md shadow-lg flex flex-col justify-between"
            style={{ height: '26rem' }}
        >
            <div>
                {icon('mx-auto p-2')}
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
    icon: PropTypes.func,
};

export default SponsorCard;
