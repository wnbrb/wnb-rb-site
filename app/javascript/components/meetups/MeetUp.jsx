import React from 'react';
import PropTypes from 'prop-types';

const Meetup = ({ speakers, title = '', talks, year, month, day }) => {
    const eventWithSpeaker = talks.map((talk) => {
        const speaker = speakers.find((speak) => speak.id === talk.speaker_id);
        return { ...talk, speaker };
    });
    return (
        <li className="w-full">
            <div className="meetups__card flex flex-col pb-12 max-w-[40rem]">
                <div className="w-full rounded shadow-lg border-t p-10 border-gray-100 overflow-hidden">
                    <h4 className="mb-4 text-xl font-bold text-gray md:text-2xl">{title}</h4>
                    {eventWithSpeaker.length > 0 &&
                        eventWithSpeaker.map(({ id, talk_title, speaker }) => (
                            <div key={id}>
                                <h5 className="mb-4 text-xl font-bold text-gray md:text-xl">
                                    {talk_title}
                                </h5>
                                <div className="flex content-center mb-8 text-lg">
                                    <img
                                        className="object-cover w-14 h-14 mr-4 rounded-full"
                                        src={speaker.image_url}
                                        alt=""
                                    />
                                    <div>
                                        <p className="font-bold text-gray md:text-lg">
                                            {speaker.name}
                                        </p>
                                        <p className="text-sm text-gray md:text-lg">
                                            {speaker.tagline}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="bg-gray-200 shadow-lg text-right">
                    <a href={`/meetups/${year}/${month}/${day}`}>
                        <button className="my-4 mr-6 py-4 px-8 bg-gray-600 rounded text-white text-lg md:text-xl">
                            View
                        </button>
                    </a>
                </div>
            </div>
        </li>
    );
};

Meetup.propTypes = {
    speakers: PropTypes.array,
    title: PropTypes.string,
    talks: PropTypes.array,
    year: PropTypes.string,
    month: PropTypes.string,
    day: PropTypes.string,
};

export default Meetup;
