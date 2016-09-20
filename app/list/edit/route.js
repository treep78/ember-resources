import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    console.error(params);
    return this.get('store').findRecord('list', params.list_id);
  },

  actions: {
    saveList(list) {
      list.save()
        .then(()=>this.transitionTo('lists'));
    },
  },
});
