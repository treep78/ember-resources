import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['done'],

  done: Ember.computed.alias('item.done'),

  actions: {
    toggleDone () {
      let id = this.get('item.id');
      let store = this.get('store');

      store.findRecord('item', id)
      .then((item) => {
        item.toggleProperty('done');
        return item;
      })
      .then((item) => item.save());
    },

    deleteItem () {
      this.get('item').destroyRecord();
    },   
  },
  store: Ember.inject.service(),
});
