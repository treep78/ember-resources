// list component
import Ember from 'ember';

export default Ember.Component.extend({
  form: {
    content: null,
    done: false,
  },

  actions: {
    clickItem (item) {
      this.sendAction('clickItem', item);
    },

    deleteItem (item) {
      this.sendAction('deleteItem', item);
    },

    submit () {
      let data = this.get('form');
      data.list = this.get('list');

      this.sendAction('createItem', data);

      this.set('form.content', null);
    },
  },
});
