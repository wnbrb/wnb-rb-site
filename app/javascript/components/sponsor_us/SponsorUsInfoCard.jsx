import React from 'react';
import PropTypes from 'prop-types';

const SponsorUsInfoCard = ({ title, section }) => {
    return (
        <div className="sponsor-info-card flex flex-col">
            <h3 className="text-2xl font-bold mx-2 my-2">{title}</h3>
            <div className="text-base leading-7 max-w-[22rem]">{section}</div>
        </div>
    );
};

SponsorUsInfoCard.propTypes = {
    title: PropTypes.string,
    section: PropTypes.object,
    children: PropTypes.object,
};

export default SponsorUsInfoCard;
