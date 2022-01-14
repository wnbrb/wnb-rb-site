import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPastMeetup } from '../../datasources';
import SharedLayout from 'components/layout/SharedLayout';
import PageTitle from 'components/PageTitle';
import 'stylesheets/page';
import 'stylesheets/meetup';

const PastMeetup = () => {
    const [meetup, setMeetup] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPastMeetup();
            setMeetup(data);
        };

        fetchData();
    }, []);

    console.log('data', meetup);
    const { title, description, speakers, panel_video_link: videoUrl } = meetup;
    return (
        <SharedLayout>
            <PageTitle text="YEAR HERE MONTH HERE MEETUP" />
            <iframe
                width="560"
                height="315"
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
            ></iframe>
            <h1>{title}</h1>;
            <div className="w-full rounded shadow-lg border-t p-10 border-gray-100 overflow-hidden">
                <h4 className="mb-4 text-xl font-bold text-gray md:text-2xl">{title}</h4>
                {speakers?.length > 0
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
            <h2>{description}</h2>
            <h1>About the speakers</h1>
            {speakers?.map(({ id, bio }) => (
                <div key={id}>{bio}</div>
            ))}
        </SharedLayout>
    );
};

export default PastMeetup;
