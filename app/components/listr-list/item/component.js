// item component
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['done'],

  done: Ember.computed.alias('item.done'),
  // click: references a function by its passed in name
  actions: {
    click () {
      this.sendAction('click', this.get('item'));
    },

    delete () {
      this.sendAction('delete', this.get('item'));
    },
  },
  store: Ember.inject.service(),
});
