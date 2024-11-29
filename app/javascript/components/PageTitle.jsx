import React from 'react';
import PropTypes from 'prop-types';
import RubyOutline from 'components/icons/NewLogo';
import 'stylesheets/page-title';

const PageTitle = ({ children }) => {
    return (
        <div className="page-title">
            <RubyOutline className="ruby-outline" />
                    
                {children}
          
        </div>
    );
};

PageTitle.propTypes = {
    children: PropTypes.node,
   
};

export default PageTitle;
