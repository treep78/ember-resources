import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    deleteList(list) {
      list.destroyRecord()
        .then(() => this.transitionTo('lists'));
    },
  },
});
