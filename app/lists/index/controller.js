import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'size', 'lookahead'],
  page: 1,
  size: 2,
  lookahead: true,
  prev: Ember.computed('page', function () {
    let page = this.get('page');
    return page > 1 && page - 1;
  }),
  next: Ember.computed('page', function () {
    return this.get('model.length') > this.get('size') &&
      this.get('page') + 1;
  }),

  modelSlice: Ember.computed('size', 'model', function () {
    let size = this.get('size');
    let length = this.get('model.length');
    let lists = this.get('model');

    if (size < length) {
      return lists.slice(0, -1);
    } else {
      return lists;
    }
  }),
});
