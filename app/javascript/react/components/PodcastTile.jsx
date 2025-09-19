import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Button from './Button';

import '../../stylesheets/podcast-tile';

const PodcastTile = ({ podcasts }) => (
    <Card className="podcast-tile">
        {podcasts.map((podcast) => (
            <div className="podcast-listing" key={podcast.id}>
                <img src={podcast.tile_image} alt={podcast.tile_image_alt} />
                <a className="podcast-title" href={podcast.url}>
                    {podcast.title}
                </a>
                <Button type="white" className="min-w-[10rem]">
                    <a href={podcast.url} target="_blank" rel="noopener noreferrer">
                        Listen
                    </a>
                </Button>
            </div>
        ))}
    </Card>
);

PodcastTile.propTypes = {
    podcasts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            tile_image: PropTypes.string,
            tile_image_alt: PropTypes.string,
            title: PropTypes.string,
            url: PropTypes.string,
        }),
    ),
};

export default PodcastTile;
