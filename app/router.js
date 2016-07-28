import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  this.route('lists');
  this.route('lists/edit', { path: '/lists/:list_id/edit' });
  this.route('list', { path: '/lists/:list_id' });
});

export default Router;
