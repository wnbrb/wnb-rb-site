import { Controller } from '@hotwired/stimulus';
import { Turbo } from '@hotwired/turbo-rails';

// Connects to data-controller="turbo"
export default class extends Controller {
    initialize() {
        this.element.setAttribute('data-action', 'click->turbo#click');
    }
    click(e) {
        e.preventDefault();

        if (this.element.hasAttribute('href')) {
            this.url = this.element.getAttribute('href');
        } else if (this.element.hasAttribute('data-href')) {
            this.url = this.element.getAttribute('data-href');
        } else if (this.element.hasAttribute('formaction')) {
            this.url = this.element.getAttribute('formaction');
        }
        if (this.url) {
            fetch(this.url, {
                headers: {
                    Accept: 'text/vnd.turbo-stream.html',
                },
            })
                .then((r) => r.text())
                .then((html) => Turbo.renderStreamMessage(html))
                .catch((err) => console.log(err));
        } else {
            console.log('No URL found');
        }
    }
}
