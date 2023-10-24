import React from 'react';
import PropTypes from 'prop-types';

const MonthSection = ({ children, month }) => (
    <li key={month} className="meetups__month flex flex-col items-start md:flex-row">
        <div className="meetups__month--name w-36">
            <h3 className="py-1 px-2 mb-4 w-min border-2 border-red-400 rounded uppercase text-md text-red-400 md:ml-auto">
                {month}
            </h3>
        </div>
        <div className="meetups__card--border hidden w-px self-stretch mx-6 border-l border-gray-200 md:block" />
        <ul className="p-4 flex flex-col gap-y-10 md:pt-2 md:p-12 md:gap-y-14 w-full">
            {children}
        </ul>
    </li>
);

export default MonthSection;

MonthSection.propTypes = {
    month: PropTypes.string,
    children: PropTypes.node,
};
