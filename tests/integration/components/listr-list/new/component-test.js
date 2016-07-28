import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('listr-list/new', 'Integration | Component | listr list/new', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{listr-list/new}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#listr-list/new}}
      template block text
    {{/listr-list/new}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
