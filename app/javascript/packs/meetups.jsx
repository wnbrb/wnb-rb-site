import React from 'react';
import ReactDOM from 'react-dom';
import Meetups from 'components/pages/Meetups';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.createElement('div');
    body.style = 'min-height: 100vh';

    ReactDOM.render(<Meetups />, document.body.appendChild(body));
});
