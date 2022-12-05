import React from 'react';
import PropTypes from 'prop-types';

export default function VideoBlock({ videoUrl, title }) {
    if (!videoUrl) {
        return null;
    }
    return (
        <div className="card-container flex flex-wrap justify-center aspect-w-16 aspect-h-9">
            <iframe src={videoUrl} title={title} frameBorder="0"></iframe>;
        </div>
    );
}

VideoBlock.propTypes = {
    videoUrl: PropTypes.string,
    title: PropTypes.string,
};
