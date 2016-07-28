import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('list', params.list_id);
  },

  actions: {
    save (list) {
      list.save();
      this.transitionTo('lists');
    }
  }
});
