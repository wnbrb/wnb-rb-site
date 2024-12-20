import React from 'react';
import PropTypes from 'prop-types';
import NewLogo from 'components/icons/NewLogo';
import 'stylesheets/page-title';

const PageTitle = ({ text, altText, children }) => {
    return (
        <div className="page-title">
            <NewLogo className="new-logo" />
            <div className="title-container">
                <h1 className="title-text" alt={altText}>
                    {text}
                </h1>
                {children}
            </div>
        </div>
    );
};

PageTitle.propTypes = {
    children: PropTypes.node,
    text: PropTypes.string,
    altText: PropTypes.string,
};

export default PageTitle;
