import React from 'react';
import PropTypes from 'prop-types';

const RubyOutline = ({ className }) => (
    <svg className={className} viewBox="0 0 210 201" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M196.259 76.8154L123.506 181.701C114.117 195.238 94.0797 195.178 84.772 181.585L13.0108 76.7845C7.94457 69.3858 7.52591 59.7501 11.9313 51.9399L28.9424 21.7813C33.1123 14.3886 40.9416 9.81592 49.4291 9.81592H104.054H159.969C168.457 9.81592 176.286 14.3886 180.456 21.7813L197.419 51.854C201.849 59.7088 201.399 69.4053 196.259 76.8154Z"
            stroke="#FDF0EF"
            strokeWidth="17.6408"
            strokeLinejoin="round"
        />
    </svg>
);

RubyOutline.propTypes = {
    className: PropTypes.string,
};

export default RubyOutline;
