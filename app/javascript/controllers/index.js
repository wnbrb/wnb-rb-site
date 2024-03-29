// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from './application';

import BsModalController from './bs_modal_controller';
application.register('bs-modal', BsModalController);

import HelloController from './hello_controller';
application.register('hello', HelloController);

import EventFormRemoveTalkController from './event_form_remove_talk_controller';
application.register('event-form-remove-talk', EventFormRemoveTalkController);

import SlimSelectController from './slim_select_controller';
application.register('slim-select', SlimSelectController);

import TurboController from './turbo_controller';
application.register('turbo', TurboController);
