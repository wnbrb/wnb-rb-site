import React from 'react';
import PropTypes from 'prop-types';

import 'stylesheets/home';

const InfoCard = ({ title, section }) => {
    return (
        <div className="info-card">
            <div className="max-w-md w-72 h-48 bg-blue-500 rounded-md">
                <h2 className="text-2xl font-bold my-2">{title}</h2>
                {section}
            </div>
        </div>
    );
};

InfoCard.propTypes = {
    title: PropTypes.string,
    section: PropTypes.object,
};

export default InfoCard;
