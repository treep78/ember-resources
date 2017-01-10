import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('list', params.list_id);
  },
  actions: {
    toggleItemDone(item) {
      console.log('stepThree');
      console.log(item.get('done'));
      item.toggleProperty('done');
      console.log(item.get('done'));
      item.save();
    },
    deleteItem(item) {
      item.destroyRecord();
    }
  }
});
