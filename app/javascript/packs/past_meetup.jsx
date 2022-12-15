import React from 'react';
import { createRoot } from 'react-dom/client';
import PastMeetup from '../components/pages/PastMeetup';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    const root = createRoot(container);

    root.render(<PastMeetup />);
});
