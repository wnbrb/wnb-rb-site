import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Helmet } from 'react-helmet-async';
import { getPastMeetups } from '../../datasources';
import SharedLayout from 'components/layout/SharedLayout';
import LoadingSpinner from 'components/LoadingSpinner';
import Meetup from '../meetups/MeetUp';

import 'stylesheets/meetup';
import EventsCalendar from '../meetups/EventsCalendar';
import horizontal from '../../../assets/images/horizontal-line.svg';
import Button from '../../components/Button';

const Meetups = () => {
    const [loading, setLoading] = useState(true);
    const [meetups, setMeetups] = useState([]);
    const [visibleCount, setVisibleCount] = useState(3);

    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPastMeetups();
            const flattenedMeetups = Object.entries(data).flatMap(([, meetupsByMonth]) => {
                return Object.values(meetupsByMonth).flat();
            });

            setMeetups(flattenedMeetups);
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        setVisibleCount(isMobile ? 2 : 3);
    }, [isMobile]);

    const handleSeeMore = () => {
        setVisibleCount(meetups.length);
    };

    const visibleMeetups = meetups.slice(0, visibleCount);

    return (
        <>
            <Helmet>
                <title>Meetups | WNB.rb</title>
            </Helmet>
            <EventsCalendar events={meetups} />
            <img src={horizontal} className="line" alt="horizontal line" />
            <SharedLayout>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="meetup-section-container">
                        <div className="container flex justify-center flex-col mx-auto ">
                            <div className="flex flex-col gap-2 justify-center items-center mx-auto ">
                                <h5 className="font-rubik text-xl font-bold text-wnbrb-blue-navy ">
                                    Archive
                                </h5>
                                <h1 className="font-syne text-3xl font-bold text-wnbrb-blue-navy ">
                                    Past Meetups
                                </h1>
                            </div>

                            <div className="archive ">
                                {visibleMeetups.length > 0 ? (
                                    <>
                                        {visibleMeetups.map(
                                            ({ id, speakers, title, date, talks }) => {
                                                const dateString = date.split('T')[0];
                                                const [year, month, day] = dateString.split('-');

                                                return (
                                                    <Meetup
                                                        key={id}
                                                        speakers={speakers}
                                                        title={title}
                                                        talks={talks}
                                                        year={year}
                                                        month={month.padStart(2, '0')}
                                                        day={day}
                                                    />
                                                );
                                            },
                                        )}
                                    </>
                                ) : (
                                    <p>No meetups available.</p>
                                )}
                            </div>
                            <div className="flex justify-center items-center">
                                {visibleCount < meetups.length && (
                                    <Button
                                        type="secondary"
                                        className="see-more-btn"
                                        onClick={handleSeeMore}
                                    >
                                        See More
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </SharedLayout>
        </>
    );
};

export default Meetups;
