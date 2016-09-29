import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    edit () {
      this.sendAction('edit', this.get('list'));
    },

    delete () {
      this.sendAction('delete', this.get('list'));
    },
  },
});
