import React from 'react';
import PropTypes from 'prop-types';

const YearSection = ({ children, year }) => (
    <section key={year} className="p-10">
        <h2 className="mb-8 text-4xl font-bold">{year}</h2>
        <ul className="flex flex-col">{children}</ul>
    </section>
);

YearSection.propTypes = {
    year: PropTypes.string,
    children: PropTypes.node,
};
export default YearSection;
