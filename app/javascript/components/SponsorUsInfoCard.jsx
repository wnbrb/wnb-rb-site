import React from 'react';
import PropTypes from 'prop-types';

const SponsorUsInfoCard = ({ title, text, children }) => {
    return (
        <div className="container max-w-xl my-8 mx-3 p-4 flex flex-col">
            <div className="flex items-center">
                {children}
                <h3 className="text-2xl font-bold mx-2 my-2">{title}</h3>
            </div>
            <div className="ml-10">
                <p className="m-2 leading-7">{text.paragraph1}</p>
                <p className="m-2 leading-7">{text.paragraph2}</p>
            </div>
        </div>
    );
};

SponsorUsInfoCard.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.object,
};

export default SponsorUsInfoCard;
