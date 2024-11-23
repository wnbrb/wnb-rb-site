import React from 'react';
import PropTypes from 'prop-types';
import outline from '../../../assets/images/outline.svg';


const RubyOutline = ({ className }) => (
    <img src={outline} alt="Ruby Outline" className={className} />
  
);

RubyOutline.propTypes = {
    className: PropTypes.string,
};

export default RubyOutline;
