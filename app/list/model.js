import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  hidden: DS.attr('boolean'),
  //stanleysAttr: DS.ro(item)
  items: DS.hasMany('item'),
});
