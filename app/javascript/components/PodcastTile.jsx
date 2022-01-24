import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

import 'stylesheets/podcast-tile';

const PodcastTile = ({ podcast }) => (
    <Card className="podcast-tile">
        <div className="flex items-center flex-1">
            <img src={podcast.tile_image} alt={podcast.tile_image_alt} />
            <a className="podcast-tile-title" href={podcast.url}>
                {podcast.title}
            </a>
        </div>
        <a className="podcast-tile-button" href={podcast.url}>
            Listen
        </a>
    </Card>
);

PodcastTile.propTypes = {
    podcast: PropTypes.object,
};

export default PodcastTile;
