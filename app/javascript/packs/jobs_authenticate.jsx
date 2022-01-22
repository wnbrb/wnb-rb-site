import React from 'react';
import ReactDOM from 'react-dom';
import JobsAuthenticate from 'components/pages/JobsAuthenticate';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.createElement('div');
    body.style = 'min-height: 100vh';

    ReactDOM.render(<JobsAuthenticate />, document.body.appendChild(body));
});
