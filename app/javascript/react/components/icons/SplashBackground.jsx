import React from 'react';
import PropTypes from 'prop-types';

import pin from 'images/pin.svg';

import colors from 'images/colors.svg';

import two from 'images/two.jpg';
import three from 'images/three.jpg';

const SplashBackground = ({ className }) => (
    <div className={`grid grid-cols-2 gap-0 ${className}`}>
        <div className="w-full bg-gray-200 flex items-center justify-center">
            <img src={two} alt="1" className="object-cover w-full h-full" />
        </div>
        <div className="w-full bg-gray-200 flex items-center justify-center">
            <img src={pin} alt="2" className="object-cover w-full h-full" />
        </div>
        <div className="w-full bg-gray-200 flex items-center justify-center">
            <img src={colors} alt="3" className="object-cover w-full h-full" />
        </div>
        <div className="w-full bg-gray-200 flex items-center justify-center">
            <img src={three} alt="4" className="object-cover w-full h-full" />
        </div>
    </div>
);

SplashBackground.propTypes = {
    className: PropTypes.string,
};

export default SplashBackground;
