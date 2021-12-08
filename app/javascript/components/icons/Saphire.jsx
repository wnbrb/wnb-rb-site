import React from 'react';
import PropTypes from 'prop-types';

const Saphire = ({ className }) => (
    <svg
        className={className}
        width="74"
        height="68"
        viewBox="0 0 74 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M70.2939 21.4609L56.5786 4.2027C55.7237 3.12693 54.4247 2.5 53.0506 2.5H20.949C19.5749 2.5 18.2759 3.12693 17.421 4.2027L3.70575 21.4609C2.38292 23.1254 2.40347 25.4881 3.75505 27.1294L33.5211 63.2756C35.3237 65.4646 38.6759 65.4646 40.4786 63.2756L70.2446 27.1294C71.5961 25.4881 71.6167 23.1254 70.2939 21.4609Z"
            fill="#9FD1FF"
            stroke="#485496"
            strokeWidth="4"
        />
        <path
            d="M6.21875 24.217L23.7173 28.5135H50.1197L67.7804 24.196"
            stroke="#87B1E1"
            strokeWidth="1.50216"
            strokeLinecap="round"
        />
        <path
            d="M46.6738 16.0443L50.3038 28.7495L43.7119 44.3359"
            stroke="#87B1E1"
            strokeWidth="1.50216"
            strokeLinecap="round"
        />
        <path
            d="M27.3282 16.0443L23.6982 28.7495L30.29 44.3359"
            stroke="#87B1E1"
            strokeWidth="1.50216"
            strokeLinecap="round"
        />
    </svg>
);

Saphire.propTypes = {
    className: PropTypes.string,
};

export default Saphire;
