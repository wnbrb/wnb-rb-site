import React from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import Checkmark from '../icons/Checkmark';

const SponsorCard = ({ type, amount, returns, children }) => {
    return (
        <div className="sponsor-card">
            <div>
                {children}
                <h3 className="text-2xl font-bold my-5">{type} Sponsor</h3>
                <ul className="h-30">
                    {returns.map((item) => {
                        return (
                            <li key={`${type}-${item}`} className="flex flex-row mb-3">
                                <Checkmark className={`checkmark ${type}`} /> {item}
                            </li>
                        );
                    })}
                </ul>
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
    returns: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.object,
};

export default SponsorCard;
