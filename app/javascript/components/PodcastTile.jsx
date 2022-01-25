import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Button from './Button';

import 'stylesheets/podcast-tile';

const PodcastTile = ({ podcast }) => (
    <Card className="podcast-tile">
        <div className="flex items-center flex-1">
            <img src={podcast.tile_image} alt={podcast.tile_image_alt} />
            <a className="podcast-tile-title" href={podcast.url}>
                {podcast.title}
            </a>
        </div>
        <Button type="white" className="min-w-[10rem]">
            <a href={podcast.url} target="_blank" rel="noopener noreferrer">
                Listen
            </a>
        </Button>
    </Card>
);

PodcastTile.propTypes = {
    podcast: PropTypes.object,
};

export default PodcastTile;
