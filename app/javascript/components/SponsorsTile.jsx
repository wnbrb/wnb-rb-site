import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

import Cleo from 'images/sponsors/cleo.svg';
import Podia from 'images/sponsors/podia.svg';
import Stripe from 'images/sponsors/stripe.svg';

import 'stylesheets/sponsors-tile';

const sponsors = [
    {
        tile_image: Podia,
        tile_image_alt: 'Podia',
        link: 'https://podia.com',
    },
    {
        tile_image: Stripe,
        tile_image_alt: 'Stripe',
        link: 'https://stripe.com',
    },
    {
        tile_image: Cleo,
        tile_image_alt: 'Cleo',
        link: 'https://web.meetcleo.com',
    },
];

const SponsorsTile = () => (
    <div className="our-sponsors">
        <Card className="sponsors-tile">
            <div className="sponsors-tile-title">Our Sponsors</div>
            <div className="sponsors-tile-img-container">
                {sponsors.map((sponsor) => (
                    <a
                        key={sponsor.tile_image_alt}
                        href={sponsor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={sponsor.tile_image} alt={sponsor.tile_image_alt} />
                    </a>
                ))}
            </div>
        </Card>
    </div>
);

SponsorsTile.propTypes = {
    sponsors: PropTypes.array,
};

export default SponsorsTile;
