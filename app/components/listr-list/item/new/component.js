import Ember from 'ember';

export default Ember.Component.extend({
  form: {},
  actions: {
    submit (item) {
      Ember.set(item, 'list', this.get('list'));
      this.sendAction('submit', item);
    },
  },
});
