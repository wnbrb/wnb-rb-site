import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import Resources from '../components/pages/Resources';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    const root = createRoot(container);

    root.render(
        <HelmetProvider>
            <Resources />
        </HelmetProvider>,
    );
});
