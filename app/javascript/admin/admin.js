/* eslint-disable no-unused-vars */
// Entry point for the build script in your package.json
import './controllers';
import * as bootstrap from 'bootstrap';
import '@hotwired/turbo-rails';
import './turbo_streams';
import './confirm_dialog';

window.bootstrap = bootstrap;
