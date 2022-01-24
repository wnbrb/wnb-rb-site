import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';

const SharedLayout = ({ children }) => (
    <div className="flex flex-col h-full">
        <Header />
        <main className="w-full h-full">{children}</main>
        <Footer />
    </div>
);

SharedLayout.propTypes = {
    children: PropTypes.node,
};

export default SharedLayout;
