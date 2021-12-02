import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPastMeetups } from '../../datasources';
import { monthFromUTC } from '../../utils/time';
import { meetupsByYear } from '../../models/meetup';
import SharedLayout from 'components/layout/SharedLayout';
import PageTitle from 'components/PageTitle';
import 'stylesheets/page';
import 'stylesheets/home';
import 'stylesheets/meetup';

const YearSection = ({ children, year }) => (
    <section key={year}>
        <h2 className="mb-8 text-4xl font-bold">{year}</h2>
        <ul className="card-list flex flex-col">{children}</ul>
    </section>
);

YearSection.propTypes = {
    year: PropTypes.string,
    children: PropTypes.node,
};

const MeetupDetails = ({ meetup }) => (
    <>
        <h3 className="py-1 px-2 w-min border-2 border-red-400 rounded uppercase text-md text-red-400">
            {monthFromUTC(meetup)}
        </h3>
        <div className="timeline self-stretch p-2 mx-4 border-l border-gray-400"></div>
        <div className="rounded shadow-lg border-t border-gray-100 overflow-hidden w-full md:w-9/12 mb-24">
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
            // const data = [
            //     {
            //         id: 1,
            //         title: 'August 2021 Meetup',
            //         location: 'virtual',
            //         description: 'Our meetup in August',
            //         date: '2021-08-31T16:00:00.000Z',
            //         panel_video_link: null,
            //         created_at: '2021-11-29T19:59:34.003Z',
            //         updated_at: '2021-11-29T19:59:34.003Z',
            //     },
            //     {
            //         id: 2,
            //         title: 'July 2021 Meetup',
            //         location: 'virtual',
            //         description: "We're so excited to see you at our special event",
            //         date: '2021-07-31T16:00:00.000Z',
            //         panel_video_link: null,
            //         created_at: '2021-11-29T19:59:34.067Z',
            //         updated_at: '2021-11-29T19:59:34.067Z',
            //     },
            //     {
            //         id: 3,
            //         title: 'July 2021 Meetup',
            //         location: 'virtual',
            //         description: "We're so excited to see you at our special event",
            //         date: '2021-07-31T16:00:00.000Z',
            //         panel_video_link: null,
            //         created_at: '2021-11-29T19:59:34.067Z',
            //         updated_at: '2021-11-29T19:59:34.067Z',
            //     },
            // ];
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
                                              key={monthFromUTC(meetup)} // month
                                              className="flex flex-col items-start md:flex-row justify-end"
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
