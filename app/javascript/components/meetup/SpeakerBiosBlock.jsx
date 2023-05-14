import React from 'react';
import PropTypes from 'prop-types';
import Microphone from '../icons/Microphone';

export default function SpeakerBiosBlock({ speakers }) {
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
}

SpeakerBiosBlock.propTypes = {
    speakers: PropTypes.arrayOf(PropTypes.object),
};
