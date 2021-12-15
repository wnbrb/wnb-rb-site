import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPastMeetups } from '../../datasources';
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
        <div className="meetups__month--name w-28">
            <h3 className="py-1 px-2 mb-4 w-min border-2 border-red-400 rounded uppercase text-md text-red-400 md:ml-auto">
                {month}
            </h3>
        </div>
        <div className="meetups__card--border hidden w-px self-stretch mx-6 border-l border-gray-200 md:block" />
        <ul className="p-4 flex flex-col gap-y-10 md:pt-2 md:p-12 md:gap-y-14">{children}</ul>
    </li>
);

MonthSection.propTypes = {
    month: PropTypes.string,
    children: PropTypes.node,
};

const Meetup = ({ speakers, title = '' }) => (
    <li>
        <div className="meetups__card flex flex-col pb-12 w-[600px]">
            <div className="w-full rounded shadow-lg border-t p-10 border-gray-100 overflow-hidden">
                <h4 className="mb-4 text-xl font-bold text-gray md:text-2xl">{title}</h4>
                {speakers.length > 0
                    ? speakers.map(({ id, name, tagline }) => (
                          <div key={id} className="flex align-start mb-4 text-lg">
                              <div>
                                  <p className="font-bold text-gray md:text-lg">{name}</p>
                                  <p className="text-sm text-gray md:text-lg">{tagline}</p>
                              </div>
                          </div>
                      ))
                    : null}
            </div>
            <div className="bg-gray-200 text-right">
                <button className="my-4 mr-6 py-4 px-8 bg-gray-600 rounded text-white text-lg md:text-xl">
                    View
                </button>
            </div>
        </div>
    </li>
);

Meetup.propTypes = {
    speakers: PropTypes.array,
    title: PropTypes.string,
};

const Meetups = () => {
    const [meetupsByYear, setMeetupsByYear] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPastMeetups();
            setMeetupsByYear(Object.entries(data));
        };

        fetchData();
    }, []);

    return (
        <SharedLayout>
            <PageTitle text="Past Meetups" />
            <div className="container flex mx-auto px-6 md:px-44 lg:mx-0">
                {meetupsByYear.length > 0
                    ? meetupsByYear.map(([year, meetupsByMonth]) => {
                          return (
                              <YearSection key={year} year={year}>
                                  {Object.entries(meetupsByMonth).map(([month, meetups]) => {
                                      return (
                                          <MonthSection key={month} month={month}>
                                              {meetups.map(({ id, speakers, title }) => {
                                                  return (
                                                      <Meetup
                                                          key={id}
                                                          speakers={speakers}
                                                          title={title}
                                                      />
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
