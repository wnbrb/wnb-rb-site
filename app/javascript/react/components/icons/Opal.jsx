import React from 'react';
import PropTypes from 'prop-types';

const Opal = ({ className }) => (
    <svg className={className} viewBox="0 0 66 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M62.6408 18.9358L51.4227 4.81984C50.492 3.64862 49.0777 2.96606 47.5816 2.96606H20.4408C18.9448 2.96606 17.5305 3.64862 16.5997 4.81984L5.38161 18.9358C3.94142 20.7481 3.96379 23.3204 5.43529 25.1073L30.2238 55.2091C32.1864 57.5923 35.8361 57.5923 37.7986 55.2091L62.5872 25.1073C64.0587 23.3204 64.081 20.7481 62.6408 18.9358Z"
            fill="#F4F4F4"
            stroke="#919191"
            strokeWidth="3.27088"
        />
        <path
            d="M7.09375 21.9571L22.3962 25.7144H45.4849L60.9292 21.9388M42.4712 14.8105L45.6456 25.9212L39.881 39.5515M25.5553 14.8105L22.3809 25.9212L28.1455 39.5515"
            stroke="url(#paint0_linear_595_994)"
            strokeOpacity="0.66"
            strokeWidth="1.63544"
            strokeLinecap="round"
        />
        <defs>
            <linearGradient
                id="paint0_linear_595_994"
                x1="25.2634"
                y1="14.8105"
                x2="25.2634"
                y2="39.5515"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#F6ABF8" />
                <stop offset="0.338542" stopColor="#F9EE8C" />
                <stop offset="0.640625" stopColor="#A8E7DF" />
                <stop offset="0.932292" stopColor="#BBE99F" />
            </linearGradient>
        </defs>
    </svg>
);
Opal.propTypes = {
    className: PropTypes.string,
};

export default Opal;
