import React, { useEffect, useState } from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import PageTitle from 'components/PageTitle';
import 'stylesheets/page';
import 'stylesheets/home';

const Meetups = () => {
    const [meetups, setMeetups] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('/api/events/past');
            const data = await result.json();

            const meetupsByYear = data.data.reduce((acc, meetup) => {
                const date = new Date(meetup.date);
                const year = date.getFullYear();
                if (acc[year]) {
                    acc[year].push(meetup);
                } else {
                    acc[year] = [meetup];
                }
                return acc;
            }, {});

            setMeetups(meetupsByYear);
        };

        fetchData();
    }, []);
    console.log(meetups);

    return (
        <SharedLayout>
            <PageTitle text="Past Meetups" />
            <ul className="container mx-auto">
                {Object.entries(meetups).length > 0
                    ? Object.entries(meetups).map(([year, meetups]) => {
                          return (
                              <li key={year}>
                                  <h2 className="text-2xl font-bold">{year}</h2>
                                  {meetups.map((meetup) => {
                                      return <span key={meetup.id}>{meetup.title}</span>;
                                  })}
                              </li>
                          );
                      })
                    : null}
            </ul>
        </SharedLayout>
    );
};
export default Meetups;
