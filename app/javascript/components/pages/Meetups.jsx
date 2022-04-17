import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPastMeetups } from '../../datasources';
import SharedLayout from 'components/layout/SharedLayout';
import LoadingSpinner from 'components/LoadingSpinner';
import PageTitleWithContainer from 'components/PageTitleWithContainer';
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

const Meetup = ({ speakers, title = '', event_speakers }) => {
    const eventWithSpeaker = event_speakers.map((talk) => {
        const speaker = speakers.find((speak) => speak.id === talk.speaker_id);
        return { ...talk, speaker };
    });
    return (
        <li>
            <div className="meetups__card flex flex-col pb-12 w-[600px]">
                <div className="w-full rounded shadow-lg border-t p-10 border-gray-100 overflow-hidden">
                    <h4 className="mb-4 text-xl font-bold text-gray md:text-2xl">{title}</h4>
                    {eventWithSpeaker.length > 0 &&
                        eventWithSpeaker.map(({ id, talk_title, speaker }) => (
                            <div key={id}>
                                <h5 className="mb-4 text-xl font-bold text-gray md:text-xl">
                                    {talk_title}
                                </h5>
                                <div className="flex content-center mb-8 text-lg">
                                    <img
                                        className="object-cover w-14 h-14 mr-4 rounded-full"
                                        src={speaker.image_url}
                                        alt=""
                                    />
                                    <div>
                                        <p className="font-bold text-gray md:text-lg">
                                            {speaker.name}
                                        </p>
                                        <p className="text-sm text-gray md:text-lg">
                                            {speaker.tagline}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="bg-gray-200 text-right">
                    <button className="my-4 mr-6 py-4 px-8 bg-gray-600 rounded text-white text-lg md:text-xl">
                        View
                    </button>
                </div>
            </div>
        </li>
    );
};

Meetup.propTypes = {
    speakers: PropTypes.array,
    title: PropTypes.string,
    event_speakers: PropTypes.array,
};

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
        <SharedLayout>
            <PageTitleWithContainer text="Past Meetups" />
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="container flex mx-auto md:max-w-[50rem] lg:max-w-[73rem]">
                    {meetupsByYear.length > 0
                        ? meetupsByYear.map(([year, meetupsByMonth]) => {
                              return (
                                  <YearSection key={year} year={year}>
                                      {Object.entries(meetupsByMonth).map(([month, meetups]) => {
                                          return (
                                              <MonthSection key={month} month={month}>
                                                  {meetups.map(
                                                      ({ id, speakers, title, event_speakers }) => {
                                                          return (
                                                              <Meetup
                                                                  key={id}
                                                                  speakers={speakers}
                                                                  title={title}
                                                                  event_speakers={event_speakers}
                                                              />
                                                          );
                                                      },
                                                  )}
                                              </MonthSection>
                                          );
                                      })}
                                  </YearSection>
                              );
                          })
                        : null}
                </div>
            )}
        </SharedLayout>
    );
};

export default Meetups;
