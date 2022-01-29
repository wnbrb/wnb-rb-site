import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';

import 'stylesheets/banner';

const Banner = ({ children }) => (
    <div className="banner">
        <Card className="banner-card">{children}</Card>
    </div>
);

Banner.propTypes = {
    children: PropTypes.node,
};

export default Banner;
