import React from 'react';
import PropTypes from 'prop-types';

import pin from '../../../assets/images/pin.svg';

import colors from '../../../assets/images/colors.svg';

import two from '../../../assets/images/two.jpg';
import three from '../../../assets/images/three.jpg';

const SplashBackground = ({ className }) => (
    <div className={`grid grid-cols-2 gap-0 ${className}`}>
        <div className="w-full bg-gray-200 flex items-center justify-center">
            <img src={two} alt="Image 1" className="object-cover w-full h-full" />
        </div>
        <div className="w-full bg-gray-200 flex items-center justify-center">
            <img src={pin} alt="Image 2" className="object-cover w-full h-full" />
        </div>
        <div className="w-full bg-gray-200 flex items-center justify-center">
            <img src={colors} alt="Image 3" className="object-cover w-full h-full" />
        </div>
        <div className="w-full bg-gray-200 flex items-center justify-center">
            <img src={three} alt="Image 4" className="object-cover w-full h-full" />
        </div>
    </div>
);

SplashBackground.propTypes = {
    className: PropTypes.string,
};

export default SplashBackground;
