import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPastMeetup } from '../../datasources';
import SharedLayout from 'components/layout/SharedLayout';
import PageTitleWithContainer from 'components/PageTitle';
import SpeakersList from '../SpeakersList';
import 'stylesheets/page';
import 'stylesheets/meetup';

const VideoBlock = ({ videoUrl }) => {
    if (!videoUrl) {
        return <p className="m-2 pt-4">No video yet</p>;
    }
    return (
        <div className="card-container flex flex-wrap justify-center">
            <iframe
                width="560"
                height="315"
                src={videoUrl}
                title="YouTube video player"
                frameBorder="0"
            ></iframe>
        </div>
    );
};

VideoBlock.propTypes = {
    videoUrl: PropTypes.string,
};

// TODO: How to get the microphone icon in?
const SpeakerBiosBlock = ({ speakers }) => {
    return (
        <div className="bg-gray-200 card-container flex flex-wrap justify-center p-10">
            <h4 className="mb-4 text-xl font-bold text-gray md:text-2xl">About the speakers</h4>
            {speakers?.map(({ id, bio }) => (
                <div key={id}>{bio}</div>
            ))}
        </div>
    );
};

SpeakerBiosBlock.propTypes = {
    speakers: PropTypes.arrayOf(PropTypes.object),
};

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
            <PageTitleWithContainer text="July 2021 meetup" />
            {meetup == 'No events found' ? (
                <p className="m-2 pt-4">No events found for this month</p>
            ) : (
                <>
                    <VideoBlock videoUrl={videoUrl} />
                    <div className="w-full rounded shadow-lg border-t p-10 border-gray-100 overflow-hidden">
                        <h3 className="text-2xl font-bold mx-2 my-2">{title}</h3>
                        <SpeakersList speakers={speakers} />
                        <p className="m-2 pt-4">{description}</p>
                    </div>
                    <SpeakerBiosBlock speakers={speakers} />
                </>
            )}
        </SharedLayout>
    );
};

export default PastMeetup;
