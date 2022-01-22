import React from 'react';
import PropTypes from 'prop-types';
import 'stylesheets/home';

const InfoCard = ({ title, section, icon, children }) => {
    const IconProp = icon;
    const iconSection = <IconProp className="hero-icon" />;

    return (
        <div className="info-card my-32 justify-between flex flex-row">
            <div className="max-w-md">
                {children}
                <h3 className="text-2xl font-bold my-2">{title}</h3>
                {section}
            </div>
            {iconSection}
        </div>
    );
};

InfoCard.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.func,
    section: PropTypes.object,
    children: PropTypes.object,
};

export default InfoCard;
