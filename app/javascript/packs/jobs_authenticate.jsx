import React from 'react';
import { createRoot } from 'react-dom/client';
import JobsAuthenticate from 'components/pages/JobsAuthenticate';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    const root = createRoot(container);

    root.render(<JobsAuthenticate />);
});
