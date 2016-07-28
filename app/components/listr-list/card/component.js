import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    delete () {
      this.sendAction('delete', this.get('list'));
    },

    edit () {
      this.sendAction('edit', this.get('list'));
    }
  }
});
