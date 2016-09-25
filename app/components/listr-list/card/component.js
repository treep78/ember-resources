import Ember from 'ember';

export default Ember.Component.extend({
  isEmpty: Ember.computed('list', function () {
    let items = this.get('list').hasMany('items');
    return items.ids().length === 0;
  }),
  actions: {
    edit () {
      this.sendAction('edit', this.get('list'));
    },

    delete () {
      this.sendAction('delete', this.get('list'));
    },
  },
});
