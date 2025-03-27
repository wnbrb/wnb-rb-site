import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { getPastMeetup } from '../../datasources';
import SharedLayout from 'components/layout/SharedLayout';
import SpeakersList from '../SpeakersList';
import LoadingSpinner from 'components/LoadingSpinner';
import eventsline from '../../../assets/images/events-line.svg';
import 'stylesheets/meetup';

const VideoBlock = ({ videoUrl, title }) => {
    if (!videoUrl) {
        return null;
    }
    return (
        <div className="video-section">
            <div className="video-container">
                <div className="video-card-container flex flex-wrap justify-center aspect-w-16 aspect-h-9">
                    <iframe src={videoUrl} title={title} style={{ border: 'none' }}></iframe>;
                </div>
            </div>
        </div>
    );
};

VideoBlock.propTypes = {
    videoUrl: PropTypes.string,
    title: PropTypes.string,
};

const SpeakerBiosBlock = ({ speakers }) => {
    return (
        <div className="abt-speaker container max-w-[77rem] flex flex-col">
            <div className="inline-flex items-center gap-2 align-center mb-5">
                <i className="bi bi-mic text-lg text-red-400"></i>
                <h4 className="text-xl font-syne font-bold text-gray md:text-2xl">
                    About the speakers
                </h4>
            </div>
            <div className="flex flex-wrap items-center gap-5">
                {speakers?.map(({ id, bio, name, links }) => (
                    <div key={id}>
                        <div>{bio}</div>
                        {Object.keys(links).length > 0 && (
                            <div className="flex items-center">
                                <p className="mr-3">More from {name}:</p>
                                {links.twitter && (
                                    <a
                                        href={links.twitter}
                                        aria-label="Twitter"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i
                                            className="bi bi-twitter-x social-icon h-4 w-4 fill-current mx-1"
                                            style={{ width: '15px' }}
                                        />
                                    </a>
                                )}
                                {links.github && (
                                    <a
                                        href={links.github}
                                        aria-label="Github"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i
                                            className="bi bi-github social-icon h-4 w-4 fill-current mx-1"
                                            style={{ width: '15px' }}
                                        />
                                    </a>
                                )}
                                {links.linkedin && (
                                    <a
                                        href={links.linkedin}
                                        aria-label="Linkedin"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i
                                            className="bi bi-linkedin social-icon h-4 w-4 fill-current mx-1"
                                            style={{ width: '15px' }}
                                        />
                                    </a>
                                )}
                                {links.mastodon && (
                                    <a
                                        href={links.mastodon}
                                        aria-label="Mastodon"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i
                                            className="bi bi-mastodon social-icon h-4 w-4 fill-current"
                                            style={{ width: '15px' }}
                                        ></i>
                                    </a>
                                )}
                                {links.website && (
                                    <a
                                        href={links.website}
                                        aria-label="Website"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i
                                            className="bi bi-globe social-icon h-4 w-4 fill-current"
                                            style={{ width: '15px' }}
                                        />
                                    </a>
                                )}
                                {links.other && (
                                    <a
                                        href={links.other}
                                        aria-label="Other"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i
                                            className="bi bi-link-45deg social-icon h-4 w-4 fill-current mx-1"
                                            style={{ width: '15px' }}
                                        />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
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
            {videoLink && (
                <>
                    <VideoBlock videoUrl={videoLink} title={title} />
                    <img src={eventsline} className="wavy" alt="line" />

                    <div key={id} className="speaker-section flex flex-col gap-[20px] px-12 py-8 content-center text-lg">
                    <h3 className="text-2xl font-bold mx-2 my-2">{title}</h3>
                        <img
                            className="object-cover w-14 h-14 mr-4 rounded-full"
                            src={imageUrl}
                            alt=""
                        />
                        <div>
                            <p className="font-bold text-gray md:text-lg">{name}</p>
                            <p className="text-sm text-gray md:text-lg">{tagline}</p>
                        </div>
                      <p>{description}</p>
                    </div>
                </>
            )}
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
    const day = window.day;
    const [loading, setLoading] = useState(true);
    const [meetup, setMeetup] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPastMeetup(year, month, day);
            setMeetup(data);
            setLoading(false);
        };

        fetchData();
    }, [year, month, day]);

    const {
        title,
        description,
        speakers,
        talks: eventSpeakers,
        panel_video_link: panelVideoUrl,
    } = meetup;
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
       
            <SharedLayout>
                {loading ? (
                    <LoadingSpinner />
                ) : panelVideoUrl ? (
                    <>
                        
                        <VideoBlock videoUrl={panelVideoUrl} title={title} />
                        <img src={eventsline} className="wavy" alt="line" />

                        
                        <div className="speaker-section w-full rounded  p-10  overflow-hidden bg-wnbrb-pink-light">
                            <h3 className="text-2xl font-bold mx-2 my-2">{title}</h3>
                            <SpeakersList speakers={speakers} />
                            <p className="m-2 pt-4">{description}</p>
                        </div>
                    </>
                ) : (
                    <>
                        {speakers.map((speaker) => {
                            const eventSpeaker = eventSpeakers.find(
                                (es) => es.speaker_id === speaker.id,
                            );
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
                <div className="flex flex-col items-center">
                    <SpeakerBiosBlock speakers={speakers} />
                </div>
            </SharedLayout>
        </>
    );
};

export default PastMeetup;
