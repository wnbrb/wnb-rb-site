import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';

const SponsorshipOption = ({ title, amount, selected, onClick }) => {
    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className="sponsorship-option-label">
            <Card className={`sponsorship-option ${selected ? 'selected' : null}`}>
                <div className="flex flex-row justify-between">
                    <div className="sponsorship-option-radio flex flex-row items-center">
                        <input
                            type="radio"
                            value={title}
                            checked={selected}
                            onChange={() => onClick()}
                        />
                        <span className="sponsorship-option-title">{title} Sponsor</span>
                    </div>
                    <p className={`${title.toLowerCase()}-color`}>${amount}</p>
                </div>
            </Card>
        </label>
    );
};

SponsorshipOption.propTypes = {
    title: PropTypes.string,
    amount: PropTypes.string,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
};

export default SponsorshipOption;
