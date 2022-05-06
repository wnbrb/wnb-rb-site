import React from 'react';
import PropTypes from 'prop-types';

const Microphone = ({ className }) => (
    <svg
        className={className}
        width="17"
        height="18"
        viewBox="0 0 17 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M8.5 2C9.603 2 10.5 2.897 10.5 4V11C10.5 12.103 9.603 13 8.5 13C7.397 13 6.5 12.103 6.5 11V4C6.5 2.897 7.397 2 8.5 2ZM8.5 0C6.291 0 4.5 1.791 4.5 4V11C4.5 13.209 6.291 15 8.5 15C10.709 15 12.5 13.209 12.5 11V4C12.5 1.791 10.709 0 8.5 0ZM16.5 9V11C16.5 15.418 12.918 19 8.5 19C4.082 19 0.5 15.418 0.5 11V9H2.5V11C2.5 14.309 5.191 17 8.5 17C11.809 17 14.5 14.309 14.5 11V9H16.5ZM9.5 22V20H7.5V22H3.5V24H13.5V22H9.5Z"
            fill="#F27C7A"
        />
    </svg>
);

Microphone.propTypes = {
    className: PropTypes.string,
};

export default Microphone;
