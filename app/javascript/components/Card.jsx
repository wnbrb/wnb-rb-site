import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';

import 'stylesheets/card';

const Card = ({ children, className, link }) => (
    <>
        <div className={`card p-10 ${className}`}>
            {children}
            <div className="flex flex-row justify-between items-center space-x-5">
                <Button type="white" className="w-20">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        Apply
                    </a>
                </Button>
            </div>
        </div>
    </>
);

Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    link: PropTypes.string,
};

export default Card;
