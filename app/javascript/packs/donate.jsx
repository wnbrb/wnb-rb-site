import React from 'react';
import { createRoot } from 'react-dom/client';
import Donate from 'components/pages/Donate';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    const root = createRoot(container);

    root.render(<Donate />);
});
