import React from 'react';
import PropTypes from 'prop-types';
import us from '../../../assets/images/us.png';
import pin from '../../../assets/images/pin.svg';
import wnb from '../../../assets/images/wnb.svg';
import colors from '../../../assets/images/colors.svg';

const SplashBackground = ({ className }) => (
    <div className={`grid grid-cols-2 gap-0 ${className}`}>
        <div className="w-full bg-gray-200 flex items-center justify-center">
            <img src={wnb} alt="Image 1" className="object-cover w-full h-full" />
        </div>
        <div className="w-full bg-gray-200 flex items-center justify-center">
            <img src={pin} alt="Image 2" className="object-cover w-full h-full" />
        </div>
        <div className="w-full bg-gray-200 flex items-center justify-center">
            <img src={colors} alt="Image 3" className="object-cover w-full h-full" />
        </div>
        <div className="w-full bg-gray-200 flex items-center justify-center">
            <img src={us} alt="Image 4" className="object-cover w-full h-full" />
        </div>
    </div>
);

SplashBackground.propTypes = {
    className: PropTypes.string,
};

export default SplashBackground;
