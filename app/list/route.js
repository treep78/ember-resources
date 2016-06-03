import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('list', params.id);
  },

  actions: {
    createItem (data) {
      let item = this.get('store').createRecord('item', data);
      return item.save();
    }
  }
});
