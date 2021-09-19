import React from 'react';
import PropTypes from 'prop-types';

const Email = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
        <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
    </svg>
);

Email.propTypes = {
    className: PropTypes.string,
};

export default Email;
