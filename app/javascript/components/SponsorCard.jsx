import React from 'react';
import Rubies from './icons/Rubies';
import Button from './Button';

const SponsorCard = () => {
    return (
        <div>
            <Rubies className="Rubies" />
            <h3>Ruby Sponsor</h3>
            <p>
                Provide books for all members of WNB.rb’s book club who would not otherwise be able
                to afford them.
            </p>
            <p>$ 2000</p>
            <a href="mailto: womennonbinary.rb@gmail.com">
                <Button type="ruby">Become a Ruby sponsor</Button>
            </a>
        </div>
    );
};

export default SponsorCard;
