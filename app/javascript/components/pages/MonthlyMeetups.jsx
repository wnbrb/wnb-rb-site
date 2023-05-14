import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { getMonthlyMeetups } from '../../datasources';
import SharedLayout from 'components/layout/SharedLayout';
import LoadingSpinner from 'components/LoadingSpinner';
import PageTitleWithContainer from 'components/PageTitleWithContainer';

import MeetupCard from 'components/meetups/MeetupCard';

import 'stylesheets/page';
import 'stylesheets/meetup';

const MonthlyMeetups = () => {
    const year = window.year;
    const month = window.month;
    const eventDate = new Date(year, Number(month - 1));
    const monthName = eventDate.toLocaleDateString('en-US', { month: 'long' });
    const [loading, setLoading] = useState(true);
    const [meetupsList, setMeetupsList] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const data = await getMonthlyMeetups(year, month);
            setMeetupsList(Object.entries(data));
            setLoading(false);
        };

        fetchData();
    }, [year, month]);
    window.meetupsList = meetupsList;

    return (
        <>
            <Helmet>
                <title>{`${year}-${month} Meetups | WNB.rb`}</title>
            </Helmet>
            <SharedLayout>
                <PageTitleWithContainer text={`${monthName} ${year} Meetups`} />
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="container flex flex-col mx-auto md:max-w-[50rem]">
                        {meetupsList.length > 0 ? (
                            meetupsList.reverse().map((meetup) => {
                                return (
                                    <>
                                        <ul className={'meetup__item'}>
                                            <MeetupCard
                                                key={meetup[1].id}
                                                event_id={meetup[1].id}
                                                speakers={meetup[1].speakers}
                                                title={meetup[1].title}
                                                event_speakers={meetup[1].event_speakers}
                                                year={`${year}`}
                                                month={`${month}`}
                                            />
                                        </ul>
                                    </>
                                );
                            })
                        ) : (
                            <>
                                <p className="text-center text-lg lg:text-2xl my-8">
                                    No Meetups for this month
                                </p>
                            </>
                        )}
                    </div>
                )}
            </SharedLayout>
        </>
    );
};

export default MonthlyMeetups;
