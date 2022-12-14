import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from 'components/pages/Home';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.createElement('div');
    body.style = 'min-height: 100vh';
    document.body.appendChild(body);

    const root = createRoot(body);

    root.render(<Home />);
});
