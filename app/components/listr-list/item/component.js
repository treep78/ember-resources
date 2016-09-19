import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['listItemCompleted'],
  listItemCompleted: Ember.computed.alias('item.done'),
  actions: {
    toggleDone () {
      this.sendAction('toggleDone', this.get('item'));
    },

    delete () {
      this.sendAction('delete', this.get('item'));
    },
  },
});
