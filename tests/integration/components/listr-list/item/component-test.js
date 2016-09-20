import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('listr-list/item', 'Integration | Component | listr list/item', {
  integration: true,
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('item', { content: 'bob' });

  this.render(hbs`{{listr-list/item item=item}}`);

  assert.equal(this.$('span.list-item').text().trim(), 'bob');

  // // Template block usage:
  // this.render(hbs`
  //   {{#listr-list/item}}
  //     template block text
  //   {{/listr-list/item}}
  // `);
  //
  // assert.equal(this.$().text().trim(), 'template block text');
});
