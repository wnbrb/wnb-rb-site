import React from 'react';
import ReactDOM from 'react-dom';
import PastMeetup from '../components/pages/PastMeetup';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.createElement('div');
    body.style = 'min-height: 100vh';

    ReactDOM.render(<PastMeetup />, document.body.appendChild(body));
});
