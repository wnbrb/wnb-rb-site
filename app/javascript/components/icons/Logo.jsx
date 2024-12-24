import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logo.svg';

const Logo = ({ className }) => <img src={logo} className={className} alt="Logo" />;

Logo.propTypes = {
    className: PropTypes.string,
};

export default Logo;
