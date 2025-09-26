import { Controller } from '@hotwired/stimulus';

// Connects to data-controller="bs-modal"
export default class extends Controller {
    connect() {
        // eslint-disable-next-line no-undef
        this.modal = new bootstrap.Modal(this.element);

        this.modal.show();
    }

    disconnect() {
        this.modal.hide();
    }
}
