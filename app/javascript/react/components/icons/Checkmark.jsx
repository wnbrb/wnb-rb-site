import React from 'react';
import PropTypes from 'prop-types';

const Checkmark = ({ className }) => (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9.06249" cy="8.77184" r="8.44921" fill={'#000000'} />
        <g clipPath="url(#clip0_595_881)">
            <path
                d="M11.6474 5.47363L8.01504 9.19676L6.31361 7.58384L5.11816 8.77993L8.01504 11.5892L12.8432 6.6694L11.6474 5.47363Z"
                fill="#FFFFFF"
            />
        </g>
        <defs>
            <clipPath id="clip0_595_881">
                <rect
                    width="7.72499"
                    height="7.72499"
                    fill="white"
                    transform="translate(5.11816 4.82886)"
                />
            </clipPath>
        </defs>
    </svg>
);

Checkmark.propTypes = {
    className: PropTypes.string,
    color1: PropTypes.string,
    color2: PropTypes.string,
};

export default Checkmark;
