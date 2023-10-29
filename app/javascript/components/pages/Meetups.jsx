import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getPastMeetups } from '../../datasources';
import SharedLayout from 'components/layout/SharedLayout';
import LoadingSpinner from 'components/LoadingSpinner';
import PageTitleWithContainer from 'components/PageTitleWithContainer';
import Meetup from '../meetups/MeetUp';
import YearSection from '../meetups/YearSection';
import MonthSection from '../meetups/MonthSection';

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
                <title>Meetups | WNB.rb</title>
            </Helmet>
            <SharedLayout>
                <PageTitleWithContainer text="Meetups"></PageTitleWithContainer>
                <div className="max-w-[73rem] p-10 mx-auto bg-gray-100">
                    <p className="mb-2">
                        <b>Our meetups</b> are held virtually on the last Tuesday of every month at{' '}
                        <a
                            href="https://dateful.com/convert/eastern-time-et?t=12pm"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            12 pm Eastern Time
                        </a>{' '}
                        <i className="bi bi-box-arrow-up-right"></i>. The content is typically
                        focused on Ruby or career-related topics, with 1-2 talks presented in a
                        lecture-style format. Anyone who identifies as a woman or non-binary
                        individual is welcome to attend. Fill in{' '}
                        <a
                            href="/join-us"
                            className="whitespace-nowrap font-medium hover:text-red-400"
                        >
                            the Subscription form
                        </a>{' '}
                        to receive an invitation to the Google Group, which will opt you into
                        calendar invites for upcoming meetups.
                    </p>
                    <p>
                        <b>Are you interested in being a speaker?</b>
                        {` We're constantly on the
                        lookout for presenters, whether you're an experienced speaker or if this is
                        your first time. Speaking at a WNB.rb meetup is an excellent opportunity to
                        enhance your public speaking abilities. If you're interested in giving a
                        talk, please provide your talk details via `}
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSdmOJxLdSdy74mXYxsr6ZRRhTN95Yxnq2B6n5mhUoGkVmDUGA/viewform"
                            className="whitespace-nowrap font-medium hover:text-red-400"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            the Talk Proposal form
                        </a>{' '}
                        <i className="bi bi-box-arrow-up-right"></i> or feel free to contact{' '}
                        <i>Adrianna Chang</i> on the WNB.rb Slack for more information.
                    </p>
                </div>
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
