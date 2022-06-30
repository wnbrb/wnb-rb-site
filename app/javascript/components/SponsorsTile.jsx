import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

import Cleo from 'images/sponsors/cleo.svg';
import Flagrant from 'images/sponsors/flagrant.svg';
import Hoist from 'images/sponsors/hoist.svg';
import Podia from 'images/sponsors/podia.svg';
import RailsDevs from 'images/sponsors/railsdevs.svg';
import Shopify from 'images/sponsors/shopify.svg';
import Stripe from 'images/sponsors/stripe.svg';
import TestDouble from 'images/sponsors/testdouble.svg';
import Weedmaps from 'images/sponsors/weedmaps.svg';

import 'stylesheets/sponsors-tile';

const sponsors = [
    {
        tile_image: TestDouble,
        tile_image_alt: 'Test Double',
        link: 'https://link.testdouble.com/wnbrb-sponsor',
        customStyles: 'w-36',
    },
    {
        tile_image: Shopify,
        tile_image_alt: 'Shopify',
        link: 'https://shopify.com',
        customStyles: 'w-40',
    },
    {
        tile_image: Weedmaps,
        tile_image_alt: 'Weedmaps',
        link: 'https://weedmaps.com/careers',
        customStyles: '',
    },
    {
        tile_image: Hoist,
        tile_image_alt: 'Hoist',
        link: 'https://hoistup.com',
        customStyles: '',
    },
    {
        tile_image: Flagrant,
        tile_image_alt: 'Flagrant',
        link: 'https://beflagrant.com',
        customStyles: '',
    },
    {
        tile_image: Podia,
        tile_image_alt: 'Podia',
        link: 'https://podia.com',
        customStyles: '',
    },
    {
        tile_image: Stripe,
        tile_image_alt: 'Stripe',
        link: 'https://stripe.com',
        customStyles: '',
    },
    {
        tile_image: Cleo,
        tile_image_alt: 'Cleo',
        link: 'https://web.meetcleo.com',
        customStyles: '',
    },
    {
        tile_image: RailsDevs,
        tile_image_alt: 'railsdevs',
        link: 'https://railsdevs.com',
        customStyles: '',
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
                        <img
                            className={sponsor.customStyles ? sponsor.customStyles : 'w-28'}
                            src={sponsor.tile_image}
                            alt={sponsor.tile_image_alt}
                        />
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
