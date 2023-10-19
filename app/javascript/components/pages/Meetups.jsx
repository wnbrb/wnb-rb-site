import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getPastMeetups } from '../../datasources';
import SharedLayout from 'components/layout/SharedLayout';
import LoadingSpinner from 'components/LoadingSpinner';
import PageTitleWithContainer from 'components/PageTitleWithContainer';
import Meetup from '../meetups/MeetUp';
import YearSection from '../meetups/YearSection';
import MonthSection from '../meetups/MonthSection';
import Card from '../Card';

import 'stylesheets/meetup';

const Meetups = () => {
    const [loading, setLoading] = useState(true);
    const [meetupsByYear, setMeetupsByYear] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const data = await getPastMeetups();
            setMeetupsByYear(Object.entries(data));
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <>
            <Helmet>
                <title>Past Meetups | WNB.rb</title>
            </Helmet>
            <SharedLayout>
                <PageTitleWithContainer text="Past Meetups" />
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="container flex flex-col mx-auto md:max-w-[50rem] lg:max-w-[73rem]">
                        {meetupsByYear.length > 0
                            ? meetupsByYear.reverse().map(([year, meetupsByMonth]) => {
                                  return (
                                      <YearSection key={year} year={year}>
                                          {Object.entries(meetupsByMonth).map(
                                              ([month, meetups]) => {
                                                  return (
                                                      <MonthSection key={month} month={month}>
                                                          {meetups.map(
                                                              ({
                                                                  id,
                                                                  speakers,
                                                                  title,
                                                                  date,
                                                                  talks,
                                                              }) => {
                                                                  const dateString =
                                                                      date.split('T')[0];
                                                                  let [year, month, day] =
                                                                      dateString.split('-');
                                                                  return (
                                                                      <Meetup
                                                                          key={id}
                                                                          speakers={speakers}
                                                                          title={title}
                                                                          talks={talks}
                                                                          year={year}
                                                                          month={month.padStart(
                                                                              2,
                                                                              '0',
                                                                          )}
                                                                          day={day}
                                                                      />
                                                                  );
                                                              },
                                                          )}
                                                      </MonthSection>
                                                  );
                                              },
                                          )}
                                      </YearSection>
                                  );
                              })
                            : null}
                    </div>
                )}
            </SharedLayout>
        </>
    );
};

export default Meetups;
