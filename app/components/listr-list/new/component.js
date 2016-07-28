import Ember from 'ember';

export default Ember.Component.extend({
  form: {
    title: null,
    hidden: false,
  },

  actions: {
    submit () {
      let data = this.get('form');

      this.sendAction('submit', data);

      this.set('form.title', null);
    }
  },
});
