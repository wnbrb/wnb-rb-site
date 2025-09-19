import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

const SharedLayout = ({ children }) => (
    <div className="flex flex-col h-full">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
    </div>
);

SharedLayout.propTypes = {
    children: PropTypes.node,
};

export default SharedLayout;
