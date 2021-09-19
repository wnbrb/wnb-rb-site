import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';

import 'stylesheets/layout';

const SharedLayout = ({ children }) => (
    <div className="layout">
        <Header />
        <div className="body">{children}</div>
        <Footer />
    </div>
);

SharedLayout.propTypes = {
    children: PropTypes.node,
};

export default SharedLayout;
