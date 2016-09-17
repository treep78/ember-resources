import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['listItemCompleted'],
  listItemCompleted: false,
  actions: {
    toggleDone () {
      return this.toggleProperty('listItemCompleted');
    },
  },
});
