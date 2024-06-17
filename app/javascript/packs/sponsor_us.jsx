import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import SponsorUs from 'components/pages/SponsorUs';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    const root = createRoot(container);

    root.render(
        <HelmetProvider>
            <SponsorUs />
        </HelmetProvider>,
    );
});
