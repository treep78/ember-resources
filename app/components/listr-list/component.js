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
      console.log('stepTwo');
      this.sendAction('toggleItemDone', item);
    },
    deleteItem(item){
      console.log('listrComp');
      this.sendAction('deleteItem', item);
    },
    createItem() {
      console.log('in listr comp create item: ', this.get('newItem'));
      let data = this.get('newItem');
      data.list = this.get('list');
      this.sendAction('createItem', data);
    }
  },
});
