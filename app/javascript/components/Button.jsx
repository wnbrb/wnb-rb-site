import React from 'react';
import PropTypes from 'prop-types';

import 'stylesheets/button';

const Button = ({ children, type, className }) => (
    <div className={`button ${className} ${type}`}>{children}</div>
);

Button.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    className: PropTypes.string,
};

export default Button;
