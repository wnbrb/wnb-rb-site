import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'components/pages/Home';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.createElement('div');
    body.style = 'min-height: 100vh';

    ReactDOM.render(<Home />, document.body.appendChild(body));
});
