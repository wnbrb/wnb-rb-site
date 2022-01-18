import React from 'react';
import ReactDOM from 'react-dom';
import Jobs from 'components/pages/Jobs';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.createElement('div');
    body.style = 'min-height: 100vh';

    ReactDOM.render(<Jobs />, document.body.appendChild(body));
});
