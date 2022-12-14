import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from 'components/pages/Home';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    const root = createRoot(container);

    root.render(<Home />);
});
