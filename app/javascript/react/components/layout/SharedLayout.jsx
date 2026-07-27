import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import FundraisingBanner from '../FundraisingBanner';

const SharedLayout = ({ children, showFundraisingBanner = false }) => (
    <div className="flex flex-col h-full">
        <Header />
        {showFundraisingBanner && <FundraisingBanner />}
        <main className="flex-1">{children}</main>
        <Footer />
    </div>
);

SharedLayout.propTypes = {
    children: PropTypes.node,
    showFundraisingBanner: PropTypes.bool,
};

export default SharedLayout;
