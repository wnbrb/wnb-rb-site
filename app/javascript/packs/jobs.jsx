import React from 'react';
import { createRoot } from 'react-dom/client';
import Jobs from 'components/pages/Jobs';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    const root = createRoot(container);

    root.render(<Jobs />);
});
