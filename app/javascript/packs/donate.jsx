import React from 'react';
import ReactDOM from 'react-dom';
import Donate from 'components/pages/Donate';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.createElement('div');
    body.style = 'min-height: 100vh';

    ReactDOM.render(<Donate />, document.body.appendChild(body));
});
