import React from 'react';
import ReactDOM from 'react-dom';
import SponsorUs from 'components/pages/SponsorUs';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.createElement('div');
    body.style = 'min-height: 100vh';

    ReactDOM.render(<SponsorUs />, document.body.appendChild(body));
});
