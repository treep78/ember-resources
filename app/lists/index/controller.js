import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'size'],
  size: 2,
  page: 1,
  prev: Ember.computed('page', function () {
    let page = this.get('page');
    return page > 1 && page - 1;
  }),
  next: Ember.computed('page', function () {
    return this.get('model.length') >= this.get('size') &&
      this.get('page') + 1;
  }),
});
