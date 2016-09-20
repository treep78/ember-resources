import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('list', params.list_id);
  },

  actions: {
    toggleItemDone (item) {
      item.toggleProperty('done');
      return item.save();
    },

    deleteItem (item) {
      return item.destroyRecord();
    },

    createItem (data) {
      let item = this.get('store').createRecord('item', data);
      return item.save();
    },

  },
});
