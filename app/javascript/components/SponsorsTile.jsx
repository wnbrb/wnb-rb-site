import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

import 'stylesheets/sponsors-tile';

const SponsorsTile = ({ sponsors }) => (
    <Card className="sponsors-tile">
        <div className="sponsors-tile-title">Our Sponsors</div>
        <div className="sponsors-tile-img-container">
            {sponsors.map((sponsor) => (
                <img key={sponsor.id} src={sponsor.tile_image} alt={sponsor.tile_image_alt} />
            ))}
        </div>
    </Card>
);

SponsorsTile.propTypes = {
    sponsors: PropTypes.array,
};

export default SponsorsTile;
