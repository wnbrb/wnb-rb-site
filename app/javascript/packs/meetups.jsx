import React from 'react';
import { createRoot } from 'react-dom/client';
import Meetups from 'components/pages/Meetups';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    const root = createRoot(container);

    root.render(<Meetups />);
});
