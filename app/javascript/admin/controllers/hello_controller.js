import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    connect() {
        console.log('Hello World!');
        // this.element.textContent = 'Hello World!';
    }
}
