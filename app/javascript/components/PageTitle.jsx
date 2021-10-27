import React from 'react';
import PropTypes from 'prop-types';
import RubyOutline from 'components/icons/RubyOutline';
import 'stylesheets/page-title';

const PageTitle = ({ text, children }) => {
    const classNames = 'title-container w-min';
    return (
        <div className="page-title">
            <RubyOutline className="ruby-outline" />
            <div className={children ? classNames : `${classNames}sm:w-max`}>
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
