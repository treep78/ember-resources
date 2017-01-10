import Ember from 'ember';

export default Ember.Component.extend({
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
    }
  },
});
