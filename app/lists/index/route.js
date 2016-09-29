import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    page: {
      refreshModel: true,
    },
  },

  model (params) {
    return this.get('store').query('list', params);
  },

  actions: {
    editList (list) {
      this.transitionTo('list.edit', list);
    },

    deleteList(list) {
      list.destroyRecord()
        .then(() => this.transitionTo('lists'));
    },
  },
});
