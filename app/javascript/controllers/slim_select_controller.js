import { Controller } from '@hotwired/stimulus';
import SlimSelect from 'slim-select';

// Connects to data-controller="slim-select"
export default class extends Controller {
    connect() {
        this.select = new SlimSelect({
            select: this.element,
            settings: {
                openPosition: 'up',
            },
        });
        document.querySelector('svg.ss-arrow').remove();
    }

    disconnect() {
        this.select.destroy();
    }
}
