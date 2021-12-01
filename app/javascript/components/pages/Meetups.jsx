import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPastMeetups } from '../../datasources';
import { meetupsByYear } from '../../models/meetup';
import SharedLayout from 'components/layout/SharedLayout';
import PageTitle from 'components/PageTitle';
import 'stylesheets/page';
import 'stylesheets/home';

const YearSection = ({ children, year }) => (
    <section key={year}>
        <h2 className="mb-8 text-4xl font-bold">{year}</h2>
        <ul className="flex flex-col gap-y-24">{children}</ul>
    </section>
);

YearSection.propTypes = {
    year: PropTypes.string,
    children: PropTypes.node,
};

const MeetupDetails = ({ meetup }) => (
    <>
        <h3 className="py-1 px-2 w-min border-2 border-red-400 rounded uppercase text-md text-red-400">
            August
        </h3>
        <div className="flex-1 rounded shadow-lg w-full md:max-w-prose">
            <div className="p-12">
                <h4 className="text-xl font-bold">{meetup.title}</h4>
            </div>
            <div className="bg-gray-200 text-right">
                <button className="my-4 mr-6 py-4 px-8 bg-gray-600 rounded text-white text-2xl">
                    View
                </button>
            </div>
        </div>
    </>
);

MeetupDetails.propTypes = {
    meetup: PropTypes.object,
};

const Meetups = () => {
    const [meetups, setMeetups] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPastMeetups();
            // TODO: Restructure { '2000': {'01': [{eventObj1, eventObj2}]}} ?
            setMeetups(meetupsByYear(data));
        };

        fetchData();
    }, []);

    console.log(meetups);

    return (
        <SharedLayout>
            <PageTitle text="Past Meetups" />
            <div className="container mx-auto max-w-6xl px-6 md:px-44 lg:mx-0">
                {Object.entries(meetups).length > 0
                    ? Object.entries(meetups).map(([year, meetups]) => {
                          return (
                              <YearSection key={year} year={year}>
                                  {meetups.map((meetup) => {
                                      return (
                                          <li
                                              key={meetup.id} // month
                                              className="flex flex-col items-start md:flex-row"
                                          >
                                              <MeetupDetails meetup={meetup} />
                                          </li>
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
