import Ember from 'ember';

export default Ember.Component.extend({
  newItem: {
    content: null,
    done: false,
  },
  classNames: ['listr'],
  classNameBindings: ['listDetailHidden'],
  listDetailHidden: false,
  actions: {
    toggleListDetail () {
      return this.toggleProperty('listDetailHidden');
    },

    toggleItemDone (item) {
      this.sendAction('toggleItemDone', item);
    },

    deleteItem (item) {
      this.sendAction('deleteItem', item);
    },

    createItem () {
      let data = this.get('newItem');
      data.list = this.get('list');
      this.sendAction('createItem', data);
      this.set('newItem.content', null);
    },
  },
});
