import React from 'react';
import PropTypes from 'prop-types';

import 'stylesheets/sponsors-tile';

const SponsorsTile = ({ sponsors }) => (
    <div className="sponsors-tile">
        <div class="flex">
            {sponsors.map((sponsor) =>
                (<div><img src={sponsor.tile_image} alt={sponsor.tile_image_alt} /></div>)
            )}
        </div>
    </div>
);

SponsorsTile.propTypes = {
    sponsors: PropTypes.array,
};

export default SponsorsTile;
