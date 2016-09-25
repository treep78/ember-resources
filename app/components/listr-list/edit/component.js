import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save () {
      this.sendAction('save', this.get('list'));
    },

    cancel () {
      this.sendAction('cancel', this.get('list'));
    },
  },
});
