import React from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import SponsorCard from 'components/SponsorCard';

import 'stylesheets/page';

const SponsorUs = () => (
    <SharedLayout>
        <div className="purple">SponsorUs page</div>
        <SponsorCard />
    </SharedLayout>
);

export default SponsorUs;
