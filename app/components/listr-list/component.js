import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['listr'],
  classNameBindings: ['listDetailHidden'],
  listDetailHidden: false,
  actions: {
    toggleItemDone (item) {
      return this.sendAction('toggleItemDone', item);
    },

    deleteItem (item) {
      return this.sendAction('deleteItem', item);
    },

    toggleListDetail () {
      return this.toggleProperty('listDetailHidden');
    },
  },
});
