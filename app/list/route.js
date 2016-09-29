import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('list', params.list_id);
  },

  actions: {
    toggleItemDone (item) {
      item.toggleProperty('done');
      item.save();
    },

    deleteItem (item) {
      item.destroyRecord();
    },

    createItem (data) {
      let item = this.get('store').createRecord('item', data);
      item.save();
    },

    saveList(list) {
      list.save()
        .then(()=>this.transitionTo('lists'));
    },

    cancelSaveList(list) {
      list.rollbackAttributes();
      history.back();
    },
  },
});
