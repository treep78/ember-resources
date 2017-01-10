import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['listItemCompleted'],
  listItemCompleted: Ember.computed.alias('item.done'),
  actions: {
    toggleDone () {
      console.log('stepOne');
      this.sendAction('toggleDone', this.get('item'));
      //return this.toggleProperty('listItemCompleted');
    },
    delete() {
      this.sendAction('delete', this.get('item'));
    }
  },
});
