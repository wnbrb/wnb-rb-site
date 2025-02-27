import React from 'react';
import PropTypes from 'prop-types';

import 'stylesheets/button';

const Button = ({ children, type = '', className = '', disabled = false, onClick = () => {} }) => {
    return (
        <button
            className={`button ${className} ${type} ${disabled ? 'disabled' : ''}`}
            disabled={disabled}
            onClick={onClick} 
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func, 
};

export default Button;
