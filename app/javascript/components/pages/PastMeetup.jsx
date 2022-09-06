import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { getPastMeetup } from '../../datasources';
import SharedLayout from 'components/layout/SharedLayout';
import PageTitleWithContainer from 'components/PageTitle';
import SpeakersList from '../SpeakersList';
import Microphone from '../icons/Microphone';
import LoadingSpinner from 'components/LoadingSpinner';
import 'stylesheets/page';
import 'stylesheets/meetup';

const VideoBlock = ({ videoUrl, title }) => {
    if (!videoUrl) {
        return null;
    }
    return (
        <div className="card-container flex flex-wrap justify-center aspect-w-16 aspect-h-9">
            <iframe src={videoUrl} title={title} frameBorder="0"></iframe>;
        </div>
    );
};

VideoBlock.propTypes = {
    videoUrl: PropTypes.string,
    title: PropTypes.string,
};

const SpeakerBiosBlock = ({ speakers }) => {
    return (
        <div className="container max-w-2xl my-8 mx-3 p-4 flex flex-col">
            <div className="inline-flex items-center gap-2 align-center mb-5">
                <Microphone />
                <h4 className="text-xl font-bold text-gray md:text-2xl">About the speakers</h4>
            </div>
            <div className="flex flex-wrap items-center gap-5">
                {speakers?.map(({ id, bio }) => (
                    <div key={id}>{bio}</div>
                ))}
            </div>
        </div>
    );
};

SpeakerBiosBlock.propTypes = {
    speakers: PropTypes.arrayOf(PropTypes.object),
};

const SpeakerVideoBlock = ({ speaker, eventSpeaker }) => {
    const { id, image_url: imageUrl, name, tagline } = speaker;
    const {
        talk_title: title,
        talk_description: description,
        talk_video_link: videoLink,
    } = eventSpeaker;
    return (
        <>
            <VideoBlock videoUrl={videoLink} title={title} />
            <div key={id} className="flex content-center mb-8 text-lg mt-8">
                <img className="object-cover w-14 h-14 mr-4 rounded-full" src={imageUrl} alt="" />
                <div>
                    <p className="font-bold text-gray md:text-lg">{name}</p>
                    <p className="text-sm text-gray md:text-lg">{tagline}</p>
                </div>
            </div>
            <p className="pb-14">{description}</p>
        </>
    );
};

SpeakerVideoBlock.propTypes = {
    speaker: PropTypes.object,
    eventSpeaker: PropTypes.object,
};

const PastMeetup = () => {
    const year = window.year;
    const month = window.month;
    const eventDate = new Date(year, Number(month - 1));
    const monthName = eventDate.toLocaleDateString('en-US', { month: 'long' });
    const [loading, setLoading] = useState(true);
    const [meetup, setMeetup] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPastMeetup(year, month);
            setMeetup(data);
            setLoading(false);
        };

        fetchData();
    }, [year, month]);

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
                <div className="max-w-[73rem] px-10 md:px-0 mx-auto my-10 sm:my-20">
                    <PageTitleWithContainer text={`${monthName} ${year} Meetup`} />
                </div>
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
                            <div className="flex flex-col items-center bg-gray-100">
                                <SpeakerBiosBlock speakers={speakers} />
                            </div>
                        </div>
                    )}
                </div>
            </SharedLayout>
        </>
    );
};

export default PastMeetup;
