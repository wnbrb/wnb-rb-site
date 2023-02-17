import React from 'react';
import PropTypes from 'prop-types';

import 'stylesheets/card';

const Card = ({ children, className }) => (
    <div className={`card p-10 ${className}`}>{children}</div>
);

Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Card;
