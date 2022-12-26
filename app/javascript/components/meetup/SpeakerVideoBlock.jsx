import React from 'react';
import PropTypes from 'prop-types';

import VideoBlock from 'components/meetup/VideoBlock';

export default function SpeakerVideoBlock({ speaker, eventSpeaker }) {
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
}

SpeakerVideoBlock.propTypes = {
    speaker: PropTypes.object,
    eventSpeaker: PropTypes.object,
};
