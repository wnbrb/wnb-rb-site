import React from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import Checkmark from '../icons/Checkmark';
import Card from 'components/Card';

const SponsorCard = ({ type, amount, returns, icon }) => {
    const Icon = icon;

    return (
        <Card className="sponsor-card w-[22rem]">
            <div className="flex flex-row items-start">
                <Icon className={type === 'Ruby' ? 'h-[58px] mt-[-5px]' : 'h-14'} />
                <div className="flex flex-col flex-1 ml-5">
                    <h3 className="text-xl font-bold">{type} Sponsor</h3>
                    <div className="flex flex-row items-center">
                        <p className={`text-lg ${type.toLowerCase()}-color`}>${amount}</p>
                        <p className="text-sm ml-2 text-wnbrb-gray-medium">/6 months</p>
                    </div>
                </div>
            </div>
            <div className="my-6 h-44">
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
            <Button type={`${type.toLowerCase()} justify-center`}>
                <a className="place-self-start" href="mailto: organizers@wnb-rb.dev">
                    Become {type === 'Emerald' ? 'an' : 'a'} {type} sponsor
                </a>
            </Button>
        </Card>
    );
};

SponsorCard.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    amount: PropTypes.string,
    returns: PropTypes.arrayOf(PropTypes.string),
    icon: PropTypes.func,
};

export default SponsorCard;
