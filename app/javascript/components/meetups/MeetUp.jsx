import React from 'react';
import PropTypes from 'prop-types';
import meetup from '../../../assets/images/meetup.jpg';
import Button from '../../components/Button';

const Meetup = ({ speakers, title = '', talks, year, month, day }) => {
    const sortedTalks = [...talks].sort((a, b) => new Date(b.date) - new Date(a.date));

    const eventWithSpeaker = sortedTalks.map((talk) => {
        const speaker = speakers.find((speak) => speak.id === talk.speaker_id);
        return { ...talk, speaker };
    });

    return (
        <li className="w-full">
            <div className="meetups__card flex flex-col pb-12 ">
                <div className="w-[19rem] rounded overflow-hidden">
                    <img src={meetup} className="stock-img" alt="meetup" />
                    <div className="card-content">
                        <h4 className="mb-4 text-xl font-bold text-gray md:text-2xl text-wnbrb-blue-navy">
                            {title}
                        </h4>
                        {eventWithSpeaker.length > 0 &&
                            eventWithSpeaker.map(({ id, talk_title, speaker }) => (
                                <div key={id}>
                                    <h5 className="mb-4 text-xl font-bold text-gray md:text-xl text-wnbrb-blue-navy">
                                        {talk_title}
                                    </h5>
                                    <div className="flex content-center mb-8 text-lg">
                                        <img
                                            className="object-cover w-14 h-14 mr-4 rounded-full"
                                            src={speaker.image_url}
                                            alt=""
                                        />
                                        <div>
                                            <p className="font-bold text-gray md:text-lg text-wnbrb-blue-navy">
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
                </div>

                <a href={`/meetups/${year}/${month}/${day}`}>
                    <Button type="primary" className="view-btn">
                        View
                    </Button>
                </a>
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
