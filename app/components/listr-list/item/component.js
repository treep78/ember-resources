import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['done'],

  done: Ember.computed.alias('item.done'),

  actions: {
    toggleDone () {
      this.get('item').toggleProperty('done');
      this.get('item').save();

      // let id = Ember.get(this, 'item.id');
      // let store = Ember.get(this, 'store');
      //
      // store.findRecord('item', id)
      // .then((item) => {
      //   item.toggleProperty('done');
      //   return item;
      // })
      // .then((item) => item.save());
    },
  },
  store: Ember.inject.service(),
});
