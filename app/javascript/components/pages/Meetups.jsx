import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPastMeetups } from '../../datasources';
import { monthNameFromNumber } from '../../utils/time';
import SharedLayout from 'components/layout/SharedLayout';
import PageTitle from 'components/PageTitle';
import 'stylesheets/page';
import 'stylesheets/meetup';

const YearSection = ({ children, year }) => (
    <section key={year}>
        <h2 className="mb-8 text-4xl font-bold">{year}</h2>
        <ul className="flex flex-col">{children}</ul>
    </section>
);

YearSection.propTypes = {
    year: PropTypes.string,
    children: PropTypes.node,
};

const MonthSection = ({ children, month }) => (
    <li key={month} className="meetups__month flex flex-col items-start md:flex-row">
        <div className="w-28">
            <h3 className="py-1 px-2 mb-4 w-min border-2 border-red-400 rounded uppercase text-md text-red-400 md:ml-auto">
                {month}
            </h3>
        </div>
        <div className="meetups__card--border hidden w-px self-stretch mx-6 border-l border-gray-200 md:block" />
        <div className="meetups__card flex flex-col pb-12 w-full md:w-9/12 md:pb-24">
            <div className="w-full rounded shadow-lg border-t border-gray-100 overflow-hidden">
                <ul className="p-4 md:p-12">{children}</ul>
                <div className="bg-gray-200 text-right">
                    <button className="my-4 mr-6 py-4 px-8 bg-gray-600 rounded text-white text-md md:text-2xl">
                        View
                    </button>
                </div>
            </div>
        </div>
    </li>
);

MonthSection.propTypes = {
    month: PropTypes.string,
    children: PropTypes.node,
};

const Meetups = () => {
    const [meetups, setMeetups] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPastMeetups();
            setMeetups(data);
        };

        fetchData();
    }, []);

    return (
        <SharedLayout>
            <PageTitle text="Past Meetups" />
            <div className="container mx-auto max-w-6xl px-6 md:px-44 lg:mx-0">
                {Object.entries(meetups).length > 0
                    ? Object.entries(meetups).map(([year, meetups]) => {
                          return (
                              <YearSection key={year} year={year}>
                                  {Object.entries(meetups).map(([month_number, meetups]) => {
                                      return (
                                          <MonthSection
                                              key={month_number}
                                              month={monthNameFromNumber(month_number)}
                                          >
                                              {meetups.map((meetup) => {
                                                  return (
                                                      <li key={meetup.id}>
                                                          <h4 className="text-xl font-bold">
                                                              {meetup.title}
                                                          </h4>
                                                      </li>
                                                  );
                                              })}
                                          </MonthSection>
                                      );
                                  })}
                              </YearSection>
                          );
                      })
                    : null}
            </div>
        </SharedLayout>
    );
};

export default Meetups;
