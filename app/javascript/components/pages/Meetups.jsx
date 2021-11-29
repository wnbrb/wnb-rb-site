import React, { useEffect, useState } from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import PageTitle from 'components/PageTitle';
import 'stylesheets/page';
import 'stylesheets/home';

const Meetups = () => {
    const [meetups, setMeetups] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('/api/events/past');
            const data = await result.json();
            setMeetups(data.data);
        };

        fetchData();
    }, []);
    console.log(meetups);

    return (
        <SharedLayout>
            <PageTitle text="Past Meetups" />
            <ul className="container mx-auto">
                {meetups && meetups.length > 0
                    ? meetups.map((meetup) => (
                          <li key={meetup.id}>
                              <h3>{meetup.title}</h3>
                          </li>
                      ))
                    : null}
            </ul>
        </SharedLayout>
    );
};
export default Meetups;
