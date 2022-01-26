import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';

const SponsorshipOption = ({ title, amount, selected }) => {
    return (
        <Card className={`sponsorship-option ${selected ? 'selected' : null}`}>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center">
                    <input
                        className="sponsorship-option-radio"
                        type="radio"
                        value={title}
                        checked={selected}
                        readOnly
                    />
                    <p className="ml-3">{title} Sponsor</p>
                </div>
                <p className={`${title.toLowerCase()}-color`}>${amount}</p>
            </div>
        </Card>
    );
};

SponsorshipOption.propTypes = {
    title: PropTypes.string,
    amount: PropTypes.string,
    selected: PropTypes.bool,
};

export default SponsorshipOption;
