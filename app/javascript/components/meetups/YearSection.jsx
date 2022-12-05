import React from 'react';
import PropTypes from 'prop-types';

export default function YearSection({ children, year }) {
    return (
        <section key={year} className="p-10">
            <h2 className="mb-8 text-4xl font-bold">{year}</h2>
            <ul className="flex flex-col">{children}</ul>
        </section>
    );
}

YearSection.propTypes = {
    year: PropTypes.string,
    children: PropTypes.node,
};
