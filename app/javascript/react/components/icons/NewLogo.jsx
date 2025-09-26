import React from 'react';
import PropTypes from 'prop-types';
import newlogo from 'images/new-logo.svg';
const NewLogo = ({ className }) => <img src={newlogo} className={className} alt="Logo" />;

NewLogo.propTypes = {
    className: PropTypes.string,
};

export default NewLogo;
