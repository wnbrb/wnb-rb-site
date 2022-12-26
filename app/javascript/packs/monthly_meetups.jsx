import React from 'react';
import ReactDOM from 'react-dom';

import MonthlyMeetups from '../components/pages/MonthlyMeetups';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.createElement('div');
    body.style = 'min-height: 100vh';

    ReactDOM.render(<MonthlyMeetups />, document.body.appendChild(body));
});
