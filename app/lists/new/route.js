import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').createRecord('list', {});
  },

  actions: {
    createList(list) {
      list.save()
        .then(()=>this.transitionTo('lists'));
    },

    cancelCreateList(list) {
      list.rollbackAttributes();
      this.transitionTo('lists');
    },

  },
});
