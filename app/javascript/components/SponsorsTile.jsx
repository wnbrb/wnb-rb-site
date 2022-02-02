import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

// import Stripe from 'images/sponsors/stripe.svg';
import Shopify from 'images/sponsors/shopify.svg';
import Contentful from 'images/sponsors/contentful.svg';

import 'stylesheets/sponsors-tile';

const sponsors = [
    /* {
	id: 1,
	tile_image: Stripe,
	tile_image_alt: 'Stripe',
    }, */
    {
        id: 2,
        tile_image: Shopify,
        tile_image_alt: 'Shopify',
    },
    {
        id: 3,
        tile_image: Contentful,
        tile_image_alt: 'Contentful',
    },
];

const SponsorsTile = () => (
    <div className="our-sponsors">
        <Card className="sponsors-tile">
            <div className="sponsors-tile-title">Our Sponsors</div>
            <div className="sponsors-tile-img-container">
                {sponsors.map((sponsor) => (
                    <img key={sponsor.id} src={sponsor.tile_image} alt={sponsor.tile_image_alt} />
                ))}
            </div>
        </Card>
    </div>
);

SponsorsTile.propTypes = {
    sponsors: PropTypes.array,
};

export default SponsorsTile;
