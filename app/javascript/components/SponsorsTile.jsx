import React from 'react';
import PropTypes from 'prop-types';

import 'stylesheets/sponsors-tile';

const SponsorsTile = ({ sponsors }) => (
    <div className="sponsors-tile">
        <div className="text-center text-lg">Sponsored by</div>
        <div className="flex flex-col sm:flex-row items-center h-36 pb-8">
            {sponsors.map((sponsor) => (
                <div key={sponsor.id}>
                    <img src={sponsor.tile_image} alt={sponsor.tile_image_alt} />
                </div>
            ))}
        </div>
    </div>
);

SponsorsTile.propTypes = {
    sponsors: PropTypes.array,
};

export default SponsorsTile;
