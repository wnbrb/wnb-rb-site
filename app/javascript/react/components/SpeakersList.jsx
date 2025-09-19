import React from 'react';
import PropTypes from 'prop-types';

const SpeakersList = ({ speakers }) => {
    if (speakers?.length > 0) {
        return speakers.map(({ id, name, tagline, image_url }) => (
            <div key={id} className="flex content-center mb-8 text-lg">
                <img className="object-cover w-14 h-14 mr-4 rounded-full" src={image_url} alt="" />
                <div>
                    <p className="font-bold text-gray md:text-lg">{name}</p>
                    <p className="text-sm text-gray md:text-lg">{tagline}</p>
                </div>
            </div>
        ));
    } else {
        return null;
    }
};

SpeakersList.propTypes = {
    speakers: PropTypes.arrayOf(PropTypes.object),
};

export default SpeakersList;
