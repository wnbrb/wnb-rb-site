import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getMeetup } from '../../datasources';
import SharedLayout from 'components/layout/SharedLayout';

import PageTitleWithContainer from 'components/PageTitleWithContainer';
import SpeakersList from 'components/SpeakersList';
import LoadingSpinner from 'components/LoadingSpinner';

import SpeakerVideoBlock from 'components/meetup/SpeakerVideoBlock';
import SpeakerBiosBlock from 'components/meetup/SpeakerBiosBlock';
import VideoBlock from 'components/meetup/VideoBlock';

import 'stylesheets/page';
import 'stylesheets/meetup';

const Meetup = () => {
    const id_event = window.id_event;

    const [loading, setLoading] = useState(true);
    const [meetup, setMeetup] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMeetup(id_event);
            setMeetup(data);
            setLoading(false);
        };

        fetchData();
    }, [id_event]);

    const {
        title,
        description,
        speakers,
        event_speakers: eventSpeakers,
        panel_video_link: panelVideoUrl,
    } = meetup;

    return (
        <>
            <Helmet>
                <title>{`${title} | WNB.rb`}</title>
            </Helmet>
            <SharedLayout>
                <PageTitleWithContainer text={`${title} Meetup`} />
                <div className="container flex mx-auto md:max-w-[50rem] lg:max-w-[73rem]">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="container mx-20">
                            {panelVideoUrl ? (
                                <>
                                    <VideoBlock videoUrl={panelVideoUrl} title={title} />
                                    <div className="w-full rounded border-t p-10 border-gray-100 overflow-hidden">
                                        <h3 className="text-2xl font-bold mx-2 my-2">{title}</h3>
                                        <SpeakersList speakers={speakers} />
                                        <p className="m-2 pt-4">{description}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {speakers.map((speaker) => {
                                        const eventSpeaker = eventSpeakers.filter(
                                            (es) => es.speaker_id === speaker.id,
                                        )[0];
                                        return (
                                            <SpeakerVideoBlock
                                                key={speaker.id}
                                                speaker={speaker}
                                                eventSpeaker={eventSpeaker}
                                            />
                                        );
                                    })}
                                </>
                            )}
                            <div className="flex flex-col items-center bg-gray-100 mb-12">
                                <SpeakerBiosBlock speakers={speakers} />
                            </div>
                        </div>
                    )}
                </div>
            </SharedLayout>
        </>
    );
};

export default Meetup;
