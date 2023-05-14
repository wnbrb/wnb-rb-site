import React from 'react';
import { createRoot } from 'react-dom/client';
import Meetup from '../components/pages/Meetup';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    const root = createRoot(container);

    root.render(<Meetup />);
});
