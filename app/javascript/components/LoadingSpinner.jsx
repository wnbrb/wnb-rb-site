import React from 'react';
import PropTypes from 'prop-types';

import 'stylesheets/loading-spinner';

const LoadingSpinner = ({ className }) => <div className={`loading-spinner ${className}`} />;

LoadingSpinner.propTypes = {
    className: PropTypes.string,
};

export default LoadingSpinner;
