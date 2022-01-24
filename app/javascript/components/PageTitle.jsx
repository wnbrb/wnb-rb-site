import React from 'react';
import PropTypes from 'prop-types';
import RubyOutline from 'components/icons/RubyOutline';
import 'stylesheets/page-title';

const PageTitle = ({ text, children }) => {
    return (
        <div className="page-title">
            <RubyOutline className="ruby-outline" />
            <div className="title-container">
                <h1 className="title-text">{text}</h1>
                {children}
            </div>
        </div>
    );
};

PageTitle.propTypes = {
    children: PropTypes.node,
    text: PropTypes.string,
};

export default PageTitle;
