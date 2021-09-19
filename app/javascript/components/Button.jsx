import React from 'react';
import PropTypes from 'prop-types';

import 'stylesheets/button';

const Button = ({ children, type }) => <div className={`button ${type}`}>{children}</div>;

Button.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
};

export default Button;
