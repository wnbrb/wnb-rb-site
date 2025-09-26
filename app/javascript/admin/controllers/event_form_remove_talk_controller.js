import { Controller } from '@hotwired/stimulus';

// Connects to data-controller="event-form-remove-talk"
export default class extends Controller {
    removeRecord(event) {
        let talkId = event.currentTarget.dataset.talkId;
        let talkPersisted = event.currentTarget.dataset.persisted === 'true';
        let talk = document.getElementById(`talk-${talkId}`);
        console.log(talkPersisted);

        if (talkPersisted) {
            let removeRecordElement = talk.querySelector('.remove_record');
            removeRecordElement.value = '1';
            talk.className += ' d-none';
        } else {
            talk.remove();
        }
    }
}
