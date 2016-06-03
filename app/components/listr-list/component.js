import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    createItem (item) {
      this.sendAction('createItem', item);
    }
  },
});
