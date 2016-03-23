[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Ember Resources

One of the chief advantages of having a front-end framework is being able to
 store and manipulate data entirely on the front-end, without needing to
 explicitly make AJAX requests.
This is accomplished through a data layer, which for Ember is a library called
 ember-data.
In this session, we'll look at how to use ember-data to set up front-end models
 and perform CRUD actions on them.

## Prerequisites

By now, you have already learned how to:

-   Create nested view states and route to them appropriately.
-   Set up resource routes.
-   Model the user interface using components.
-   Represent visual hierarchies with nested components.
-   Register actions and click handlers on component objects.
-   Pass data from routes to components, and from components to components.

## Objectives

By the end of this session, you should be able to:

-   Generate a Model to represent a resource on the front-end.
-   Create an Adapter to connect your Model(s) to an API.
-   Make Models accessible in templates by loading them through Routes.
-   Create CRUD actions on a Route, and trigger them from Components.
-   Add behavior to Route actions to perform CRUD on the Route's model.
-   Create an Ember Service, and inject it into a Component.

## Setup

1.  Fork and clone this repo.
1.  Run `npm install` and `bower install`
1.  Clone this [Rails API repo](https://github.com/ga-wdi-boston/ember-resources-api)
     into a separate directory on your machine.
1.  Run `bundle install` inside the Rails API repo.
1.  Run `rake db:create`, `rake db:migrate`, and `rake db:example:all` to set up
     the Rails API's database.

## ember-data and CRUD

In the past few days, you've seen a whole lot of Ember's 'view' layer - the
 system governing how Ember responds to user behavior and controls what HTML
 gets rendered in the browser.

While this is all very nice, it's meaningless without a back-end.
That's where Ember's 'data' layer comes in, as implemented by an add-on library
 to Ember called `ember-data`.

`ember-data` provides several Ember Classes for handling the interchange of
 information between the front-end and the back-end, most notably Models (which
 represent back-end resources as Ember Objects) and Adapters (which manage the
 actual interactions with the underlying APIs).

To learn about how Ember's data layer works, we're going to build an application
 together...

![Charmander Used 'Ember'](./readme-assets/charmander.jpeg)

For those of you who aren't familiar with the Pokemon games, the premise is that
 the main character is on an adventure to capture and train wild monsters called
 Pokemon, in order to pit them against other Pokemon on a quest to become the
 very best (like no one ever was).

As players encounter different Pokemon, they use a tool called a 'PokeDex' to
 keep track of the different monsters that they've seen and caught.
This tool also has lots of other useful information about the Pokemon, including
 their name, their officially designated number, and fighting stats.

Together, we're going to make a simplified version of the PokeDex in Ember!

### Code-Along : Making a Pokemon Model

Once you start your Rails server, that API will begin serving up JSON at
 localhost:3000.
If we navigate to [`http://localhost:3000/pokemon`](http://localhost:3000/pokemon),
 we might see something like this:

```javascript
{
  "pokemon": [
    {
      "id": 1,
      "name": "Bulbasaur",
      "national_poke_num": 1,
      "type_one": "GRASS",
      "type_two": "POISON",
      //...
    },
    {
      "id": 2,
      "name": "Ivysaur",
      "national_poke_num": 2,
      "type_one": "GRASS",
      "type_two": "POISON",
      // ...
    }
  ]
}
```

To establish a line of communication with this API, we're going to need an
 **Adapter**.

```bash
ember g adapter pokemon
```

This creates a new `adapter.js` file inside `app/pokemon`.
The new Adapter is subclassed from ApplicationAdapter, the Adapter defined in
 `app/application`.

Inside `adapter.js`, we'll need to put some information about the API we want to
 use for the Pokemon resource - specifically, what host URL to use.
It's important to note that Ember has a bit of a weird quirk when generating
 adapters -- it doesn't account for using a pod-based file structure when
 generating the reference URL to application adapter -- so we'll have to fix it
 by setting that URL to `../application/adapter` instead of `./application`.

Finally, because Pokemon is 'uncountable' (i.e. the plural of Pokemon is
 also Pokemon) we need to tell our adapter that it should make requests to
 `http://localhost:3000/pokemon` instead of `.../pokemons`.
Finally, as just a weird quirk of Ember's

```js
import Ember from 'ember';
import ApplicationAdapter from '../application/adapter';

Ember.Inflector.inflector.uncountable('pokemon');

export default ApplicationAdapter.extend({
  host: 'http://localhost:3000'
});
```

That's it!
Our Ember app now knows that when it wants to make Pokemon-related requests, it
 should direct them to `http://localhost:3000/pokemon/...`.

The next step is to create a Model for Pokemon so that we can interact with it
 in our Ember app.
Generating a model is just as easy as generating an adapter was.

```bash
ember g model pokemon
```

This will create a new `model.js` file inside `app/pokemon`.
Here is where we'll need to specify all of the properties that we want the model
 to have.
If we look at the JSON data coming from the API, we can see that there are a
 number of properties being returned: `id`, `name`, `national_poke_num`,
 `type_one`, `type_two`, and more.

We can pick whichever of these we want to include in the model, but for the sake
 of being completionists, let's add _all_ of the properties.

```js
import DS from 'ember-data';

export default DS.Model.extend({
  nationalPokeNum: DS.attr('number'),
  name: DS.attr('string'),
  typeOne: DS.attr('string'),
  typeTwo: DS.attr('string')
  // ...
});
```

`DS.attr` is how we define attributes for our models.
The default types are 'number', 'string', 'boolean', and 'date', but you can
 define your own if you really need to.
You can also use `DS.attr` to specify a default value for a given
 attribute by passing in an optional object as a second argument.

Once you have your model, you can easily create Computed Properties for it just
 like with any other Ember Object. Just don't forget to import Ember.

```js
import Ember from 'ember';
// ...
export default DS.Model.extend({
  // ...
  types: Ember.computed.collect('typeOne', 'typeTwo')
});
```

Now that we have a Pokemon model, we want to be able to use its data in our
 templates.

As you saw in the material on routing, each Route has a `model` function that
 exposes data to the templates.
Each Route has a `store` property which refers to whatever data store your
 application is using (in this case, ember-data), so to make the Pokemon model
 available in the `pokemon` route, we reference the store and query it for all
 Pokemon instances.

```js
export default Ember.Route.extend({
  model: function(){
    return this.store.findAll('pokemon');
  }
});
```

### Lab : Making an Item Model

In addition to tracking the Pokemon we've seen and caught on our journey, the
 PokeDex also keeps track of our current inventory of items.

Using the Rails API as a guide, create a new Adapter and Model so that we can
 use an Item resource on the front-end.
Then, make it available in the `items` Route.

## Ember CRUD - Data Down, Actions Up (DDAU)

Now that we have models loaded in our Routes, it's finally time to tie all of
 this together.

Before talking about CRUD, though, we should start by talking about something
 you touched on in the material on Components: 'actions'.
'Actions' are a special class of trigger-able events that are handled by the
 `Ember.ActionHandler` Ember Class.
Like normal events, actions 'bubble up', moving from the leaf (i.e. Template)
 to the root (i.e. the 'application' Route) until they are met by a matching
 handler.

In Ember 1, action handlers inside the Controller were used to perform CRUD on
 the model.
This made sense, since the Controller was responsible for managing all of the
 business data in our application, and since it mirrored how responsibilities
 were broken out in Rails.
An action could be triggered in a Template and bubble up to a
 Controller, where it would cause that Controller to manipulate the given Model.

However, with the shift towards Components in Ember 2, a lot of the
 functionality of Controllers has been made redundant and moved into other
 entities within the app.
In this case, Components and Routes both incorporate `Ember.ActionHandler`, so
 we can instead set our action handlers there.
For simplicity's sake, we'll put all handlers related to Model CRUD into the
 Route; any other action handlers can be placed in either place.

Defining Action handlers in a Route is very easy. Simply open up the `route.js`
 file and make the following addition:

```js
import Ember from 'ember';

export default Ember.Route.extend({
  model: function(...){
    ...
  },
  actions: {
    create: function(){ ... },
    update: function(){ ... },
    destroy: function(){ ... }
    // ... etc
  }
});
```

To trigger an action, you can add an `{{action ... }}` helper to an element
 (usually a button) - this will cause that element to launch the action whenever
 it executes its defaults behavior (in the case of a button, being clicked).

In Ember applications that use Components (which will soon be all of them)
the generally recommended strategy is to follow a 'data down, actions up'
design pattern, which essentially means two things:

1.  All Components look to their parent element as a source of data to bind to;
    as a result, data changes propagate 'downwards' from parent to child.
1.  Implicit in the first point is that all changes to date place in the parent.
    In order to effect changes to the data in a parent element, Components
    trigger their parents' actions; in this fashion, action invocations
    propagate 'upwards' from child to parent.

### Code-Along : Handling Actions

Let's add some action handlers to our Route by opening up `app/pokemon/route.js`
 and adding the following:

```js
actions: {
  createPokemon: function() {
    console.log('Route Action : createPokemon');
  },
  updatePokemon: function() {
    console.log('Route Action : updatePokemon');
  },
  destroyPokemon: function() {
    console.log('Route Action : destroyPokemon');
  }
}
```

Let's also add some HTMLbars to the 'pokemon' Template:

```html
<button {{action 'createPokemon'}}>CREATE</button>
<button {{action 'updatePokemon'}}>UPDATE</button>
<button {{action 'destroyPokemon'}}>DESTROY</button>
```

We should now see three new buttons appear in the 'pokemon' view state.
If we click one of these buttons, it will trigger the corresponding action in
 the Route.

As was mentioned, Routes are not the only things that can have actions;
 Components can have them too.
Let's add some actions to the 'pokemon-snippet' Component

```js
actions: {
  updatePokemon: function(){
    console.log('Component Action : updatePokemon');
  },
  destroyPokemon: function(){
    console.log('Component Action : destroyPokemon');
  }
}
```

and add two new buttons to the 'pokemon-snippet' Component's Template:

```html
<h4>#{{pokemon.nationalPokeNum}} : {{pokemon.name}}</h4>
<p> Generation: {{pokemon.generation}} </p>
<button {{action 'updatePokemon'}}>EDIT</button>
<button {{action 'destroyPokemon'}}>DESTROY</button>
<p>
  Type(s): {{pokemon.typeOne}}
  {{#if twoTypes}}
    / {{pokemon.typeTwo}}
  {{/if}}
</p>
```

Clicking these new buttons triggers their respective actions in the Component.
Simple enough!

What if we want to trigger a Route action from within a Component?
Because Components are essentially modular, this is accomplished by
 passing that action into the Component when the Component is created.
Let's modify the 'pokemon' Template as follows:

```html
<ul>
{{#each model as |eachPokemon|}}
  {{pokemon-snippet pokemon=eachPokemon
      routeUpdatePokemon='updatePokemon'
      routeDestroyPokemon='destroyPokemon'
  }}
{{/each}}
</ul>
```

This will make the `updatePokemon` and `destroyPokemon` Route actions available
 to the 'pokemon-snippet' Component, under the aliases of `routeUpdatePokemon`
 and `routeDestroyPokemon`, respectively.
To actually trigger one of these actions from within the Component, we can call
 the method `sendAction`, passing in the name of the desired action as the first
 argument.

```js
actions: {
  updatePokemon: function(){
    console.log('Component Action : updatePokemon');
    this.sendAction('routeUpdatePokemon');
  }
},
```

As you can see, the Component accepts two types of inputs: data (such as
 `eachPokemon`) and references to actions (such as `'updatePokemon'`).

To actually perform the CRUD in the Route, you need to manipulate the store,
 which is what we'll be looking at after the next lab.

### Lab : Handling Actions

Give Items the same treatment that we've just given Pokemon.
Add `createItem`, `updateItem`, and `destroyItem` actions to the 'items'
 Route; each method should print output of the form
 "Route Action : createItem" to the console.
Then, pass these actions into the 'item-row' Component and define
 Component-level actions which can trigger the Route's actions.
Finally, link the new `destroyItem` action to the button in the 'item-row'
 Template.

### Code-Along : Destroy (DDAU)

Now let's add some functionality behind those Route actions - any time the
 `destroyPokemon` Route action is triggered, we destroy a particular Pokemon.
The way to destroy a given record from the data store is
 `<record>.destroyRecord()`. However, before we can destroy a record, we need to
 find it; we can do this using `<store>.findRecord(<type of record>, <id>)`
 (when invoked from a Route, the store is accessible at `this.store`).
However, the `findRecord` method returns a Promise, so we'll need handle that
 Promise in the usual way.

```js
export default Ember.Route.extend({
  model: function(){
    return this.store.findAll('pokemon');
  },
  actions: {
    // ...
    destroyPokemon: function() {
      console.log('Route Action : destroyPokemon');
      this.store.findRecord('pokemon', <id>).then((record) => {
        record.destroyRecord()
      });
    }
  }
});
```

We're missing one critical piece of information : the `id` of
 the particular Pokemon we want to destroy.
We need to pass that information from the 'pokemon-snippet' Component
 (which has access to that particular record) back up to the Route.
We can do this by passing additional arguments to `sendAction`.

Let's change the Component's `destroyPokemon` action so that it passes in the
 `id` of the Pokemon it refers to.

```js
export default Ember.Component.extend({
  // ...
  actions: {
    // ...
    destroyPokemon: function(){
      console.log('Component Action : destroyPokemon');
      this.sendAction('routeDestroyPokemon', this.get('pokemon').get('id'));
    }
  }
});
```

Then, we change the Route action so that it can accept an argument, `id`.

```js
export default Ember.Route.extend({
  model: function(){
    return this.store.findAll('pokemon');
  },
  actions: {
    // ...
    destroyPokemon: function(id){
      console.log('Route Action : destroyPokemon');
      this.store.findRecord('pokemon', id).then(function(pokemon){
        pokemon.destroyRecord();
        console.log(`record ${id} destroyed`);
      });
    }
  }
});
```

When we click the 'DELETE' button, the record for that Pokemon gets destroyed.

### Lab : Destroy (DDAU)

Let's revisit our 'item' resource. As you can see the table shows a list of five
 items that were loaded into the Mirage test fixture. In each row, we have a
 button with an 'X' inside it.
In the previous exercise, we set it up so that clicking that button would
 trigger an action in the Component (which would, in turn, trigger an action in
 the Route).

On your own, edit the `destroyItem` actions inside the 'item-row' Component and
 'items' Route so that clicking the 'X' button in a given row destroys that row.

### Code-Along : Create (DDAU)

Adding a new Pokemon is a behavior tied to the _list_ of Pokemon instead of any
 particular Pokemon, so it would make the most sense to handle that behavior
 outside of the 'pokemon-snippet' Component.

We can create a new Component called 'pokemon-form' using

```bash
ember g component pokemon-form
```

Let's populate that new Component's Template with the following:

```html
<h5> Add a Pokemon to the directory! </h5>
<div>
  {{input placeholder='National Pokemon Number'}}
  {{input placeholder='Name'}}
  {{input placeholder='Type One'}}
  {{input placeholder='Type Two'}}
  {{input placeholder='Generation'}}
  {{input placeholder='Total Points'}}
  {{input placeholder='Base HP'}}
  {{input placeholder='Base Attack'}}
  {{input placeholder='Base Defense'}}
  {{input placeholder='Base Sp. Attack'}}
  {{input placeholder='Base Sp. Defense'}}
  {{input placeholder='Base Speed'}}
</div>
<button {{action 'createPokemon'}}> Add a New Pokemon </button>
```

We can then reference this new Component from the `/pokemon` Template:

```html
{{pokemon-form routeCreatePokemon='createPokemon'}}
<ul>
{{#each model as |eachPokemon|}}
  {{pokemon-snippet pokemon=eachPokemon
      routeUpdatePokemon='updatePokemon'
      routeDestroyPokemon='destroyPokemon'
  }}
{{/each}}
</ul>
```

As you can see, clicking the button labeled 'Add a New Pokemon' triggers the
 Route's `createPokemon` action.

Adding a new record to the data store looks like
 `<store>.createRecord(<type of record>, <new record data>).save()`

```js
export default Ember.Route.extend({
  model: function(){
    return this.store.findAll('pokemon');
  },
  actions: {
    createPokemon: function(){
      console.log('Route Action : createPokemon');
      var newPokemon = this.store.createRecord('pokemon', {
        nationalPokeNum: 201,
        name: 'Unown',
        typeOne: 'PSYCHIC',
        typeTwo: '',
        generation: 2
      });
      newPokemon.save().then(function(){
        console.log('record created');
      });
    },
    // ...
  }
});
```

> Get it? '[Unown](http://pokemondb.net/pokedex/unown)'?

As you can see, this will create a new Pokemon with the specified information
 every time we click the button.
How do we instead tell it to use the information specified in the `<input>`
 fields?

The answer is: **binding**. Component properties are automatically bound to
 values in their Template, so all you need to do is have an object inside the
 Component that the form fields can hook into.

```js
export default Ember.Component.extend({
  form: {},
  actions: {
    createPokemon: function(){
      console.log('Component Action : createPokemon');
      this.sendAction('routeCreatePokemon', this.get('form'));
      this.set('form', {});
    }
  }
});
```

```html
<h5> Add a Pokemon to the directory! </h5>
<div>
  {{input placeholder='National Pokemon Number' value=form.nationalPokeNum}}
  {{input placeholder='Name' value=form.name}}
  {{input placeholder='Type One' value=form.typeOne}}
  {{input placeholder='Type Two' value=form.typeTwo}}
  {{input placeholder='Generation' value=form.generation}}
  {{input placeholder='Total Points' value=form.totalPoints}}
  {{input placeholder='Base HP' value=form.baseHp}}
  {{input placeholder='Base Attack' value=form.baseAttack}}
  {{input placeholder='Base Defense' value=form.baseDefense}}
  {{input placeholder='Base Sp. Attack' value=form.baseSpAttack}}
  {{input placeholder='Base Sp. Defense' value=form.baseSpDefense}}
  {{input placeholder='Base Speed' value=form.baseSpeed}}
</div>
<button {{action 'createPokemon'}}> Add a New Pokemon </button>
```

Now we can create new Pokemon records by filling out our form.

### Lab : Create (DDAU)

Create a new Component called 'new-item-form' to act as a form for making new
 items.
Use the following HTML content as the basis for the Component's Template:

```html
<h4> Create a New Item </h4>

<p>Name: {{input}}</p>
<p>Category: {{input}}</p>
<p>Effect: {{input}}</p>

<button>Create Item</button>
```

## CRUD : Updating an Existing Record

Now that we've handled Create and Destroy, the last CRUD action to take care of
 is Update.
There are several different ways to accomplish an update, depending on your UI,
 so let's start by making the following decision about how we want things to
 behave.
**Keep in mind that these are just design decisions - your needs may differ,**
 **depending on your application.**

-   Updating, like destroying, is specific to one particular record, so it might
     make sense to handle that behavior from within the 'pokemon-snippet'
     Component.
-   Within the 'pokemon-snippet' Component, we should be able to toggle between
     'editable' and 'not editable' states.
-   This state change should be controlled by the 'EDIT' button that we already
     have.
-   When the 'pokemon-snippet' Component is in its 'not editable' state, it
     should look the same as it currently does.
-   When the 'pokemon-snippet' Component is in its 'editable' state, every data
     value should be replaced by an input box.
-   The values of those input boxes should at least be set initially to the
     current values of those properties, and possibly should be bound
     permanently to said values.

Given these assumptions/decisions, let's see if we can work our way towards
 working Update behavior.

> Updating, like destroying, is specific to one particular record, so it might
>  make sense to handle that behavior from within the 'pokemon-snippet'
>  Component.

> Within the 'pokemon-snippet' Component, we should be able to toggle between
>  'editable' and 'not editable' states.

These indicate that we should have some sort of state property, attached to the
 'pokemon-snippet' Component, which can be toggled by a button (implying that
 there must be a Component action to trigger the toggle).
In that vein, let's add a new property and action to the 'pokemon-snippet'
 Component : `isEditable` and `toggleEditable`, respectively.

```js
export default Ember.Component.extend({
  tagName: 'li',
  twoTypes: Ember.computed('pokemon.typeOne', 'pokemon.typeTwo', function(){
    return this.get('pokemon.typeTwo') && this.get('pokemon.typeTwo') !== this.get('pokemon.typeOne');
  }),
  isExpanded: false,
  isEditable: false,
  actions: {
    toggleExpanded: function(){
      this.toggleProperty('isExpanded');
    },
    toggleEditable: function(){
      this.toggleProperty('isEditable');
    },
    updatePokemon: function(){
      console.log('Component Action : updatePokemon');
      this.sendAction('routeUpdatePokemon');
    },
    destroyPokemon: function(){
      console.log('Component Action : destroyPokemon');
      this.sendAction('routeDestroyPokemon', this.get('pokemon'));
    }
  }
});
```

> This state change should be controlled by the 'EDIT' button that we already
>  have.

Straightforward enough. Let's change the EDIT button so that it triggers the new
 `toggleEditable` action.

```html
<strong>#{{pokemon.nationalPokeNum}} : {{pokemon.name}}</strong>
<button {{action 'toggleExpanded'}}>
  {{#unless isExpanded}}EXPAND{{else}}COLLAPSE{{/unless}}
</button>
{{#if isExpanded}}
  <button {{action 'toggleEditable'}}>EDIT</button>
  <button {{action 'destroyPokemon'}}>DELETE</button>
  <p> Generation: {{pokemon.generation}} </p>
  <p> Type: {{pokemon.typeOne}} {{#if twoTypes}}/ {{pokemon.typeTwo}}{{/if}} </p>
{{/if}}
```

> Although this wasn't mentioned as a requirement, it might be a little weird if
>  we were to set `isEditable` to true, and then for it to remain true after
>  we've collapsed and then reopened the Component.
> Let's change our `toggleExpanded` action so that it sets `isEditable` to false
>  every time the Component is collapsed.

```js
export default Ember.Component.extend({
  // ...
  isExpanded: false,
  isEditable: false,
  actions: {
    toggleExpanded: function(){
      this.toggleProperty('isExpanded');
      if (!this.get('isExpanded')) {
        this.set('isEditable', false);
      }
    },
    // ...
  }
});
```

> When the 'pokemon-snippet' Component is in its 'not editable' state, it should
>  look the same as it currently does.
> When the 'pokemon-snippet' Component is in its 'editable' state, every data
>  value should be replaced by an input box.

There are probably a couple of ways you could do this, but what would probably
 by easiest is simple to have two separate sections of the Component's Template,
 switched by an `{{#if}}` or `{{#unless}}` helper.
Since the normal state should show up when the Component is _not_ editable, it
 would probably make sense to use `{{#unless}}`.

```html
{{#unless isEditable}} {{!-- Non-editable Version --}}
  <strong>#{{pokemon.nationalPokeNum}} : {{pokemon.name}}</strong>
  <button {{action 'toggleExpanded'}}>
    {{#unless isExpanded}}EXPAND{{else}}COLLAPSE{{/unless}}
  </button>
  {{#if isExpanded}}
    <button {{action 'toggleEditable'}}>EDIT</button>
    <button {{action 'destroyPokemon'}}>DELETE</button>
    <p> Generation: {{pokemon.generation}} </p>
    <p> Type: {{pokemon.typeOne}} {{#if twoTypes}}/ {{pokemon.typeTwo}}{{/if}} </p>
  {{/if}}
{{/unless}}
```

To handle the opposite case, we can add an `{{else}}` helper.

```html
{{#unless isEditable}} {{!-- Non-editable Version --}}
  <strong>#{{pokemon.nationalPokeNum}} : {{pokemon.name}}</strong>
  <button {{action 'toggleExpanded'}}>
    {{#unless isExpanded}}EXPAND{{else}}COLLAPSE{{/unless}}
  </button>
  {{#if isExpanded}}
    <button {{action 'toggleEditable'}}>EDIT</button>
    <button {{action 'destroyPokemon'}}>DELETE</button>
    <p> Generation: {{pokemon.generation}} </p>
    <p> Type: {{pokemon.typeOne}} {{#if twoTypes}}/ {{pokemon.typeTwo}}{{/if}} </p>
  {{/if}}
{{else}}  {{!-- Editable Version --}}
  <strong>#{{pokemon.nationalPokeNum}} : {{pokemon.name}}</strong>
  <button {{action 'toggleExpanded'}}>
    {{#unless isExpanded}}EXPAND{{else}}COLLAPSE{{/unless}}
  </button>
  {{#if isExpanded}}
    <button {{action 'toggleEditable'}}>EDIT</button>
    <button {{action 'destroyPokemon'}}>DELETE</button>
    <p> Generation: {{pokemon.generation}} </p>
    <p> Type: {{pokemon.typeOne}} {{#if twoTypes}}/ {{pokemon.typeTwo}}{{/if}} </p>
  {{/if}}
{{/unless}}
```

Now we can swap all of the normal HTML-escaped values (`{{ someValue }}`) for
 `{{input}}` helpers, so that they can generate new `<input>` elements.

```html
{{#unless isEditable}} {{!-- Non-editable Version --}}
  <strong>#{{pokemon.nationalPokeNum}} : {{pokemon.name}}</strong>
  <button {{action 'toggleExpanded'}}>
    {{#unless isExpanded}}EXPAND{{else}}COLLAPSE{{/unless}}
  </button>
  {{#if isExpanded}}
    <button {{action 'toggleEditable'}}>EDIT</button>
    <button {{action 'destroyPokemon'}}>DELETE</button>
    <p> Generation: {{pokemon.generation}} </p>
    <p> Type: {{pokemon.typeOne}} {{#if twoTypes}}/ {{pokemon.typeTwo}}{{/if}} </p>
  {{/if}}
{{else}}  {{!-- Editable Version --}}
  <strong>
    #{{input}} : {{input}}
  </strong>
  <button {{action 'toggleExpanded'}}>
    {{#unless isExpanded}}EXPAND{{else}}COLLAPSE{{/unless}}
  </button>
  <button {{action 'toggleEditable'}}>EDIT</button>
  <button {{action 'destroyPokemon'}}>DELETE</button>
  <p> Generation: {{input}} </p>
  <p> Type: {{input}} / {{input}} </p>
{{/unless}}
```

Let's also change the 'EDIT' button to say 'CONFIRM EDIT' in the isEditable
 case.

> The values of those input boxes should at least be set initially to the
>  current values of those properties, and possibly should be bound permanently
>  to said values.

The `{{input}}` helper allows for binding the value of an input box to another
 variable, so for simplicity's sake, let's just opt for that solution and bind
 all of the input boxes to their respective properties in the Component.

```html
{{#unless isEditable}} {{!-- Non-editable Version --}}
  <strong>#{{pokemon.nationalPokeNum}} : {{pokemon.name}}</strong>
  <button {{action 'toggleExpanded'}}>
    {{#unless isExpanded}}EXPAND{{else}}COLLAPSE{{/unless}}
  </button>
  {{#if isExpanded}}
    <button {{action 'toggleEditable'}}>EDIT</button>
    <button {{action 'destroyPokemon'}}>DELETE</button>
    <p> Generation: {{pokemon.generation}} </p>
    <p> Type: {{pokemon.typeOne}} {{#if twoTypes}}/ {{pokemon.typeTwo}}{{/if}} </p>
  {{/if}}
{{else}}  {{!-- Editable Version --}}
  <strong>
    #{{input valueBinding='pokemon.nationalPokeNum'}} : {{input valueBinding='pokemon.name'}}
  </strong>
  <button {{action 'toggleExpanded'}}>
    {{#unless isExpanded}}EXPAND{{else}}COLLAPSE{{/unless}}
  </button>
  <button {{action 'toggleEditable'}}>CONFIRM EDIT</button>
  <button {{action 'destroyPokemon'}}>DELETE</button>
  <p> Generation: {{input valueBinding='pokemon.generation'}} </p>
  <p> Type: {{input valueBinding='pokemon.typeOne'}} / {{input valueBinding='pokemon.typeTwo'}} </p>
{{/unless}}
```

> Guess we didn't need those `updatePokemon` actions after all - let's remove
>  them.
> Let's also get rid of the three buttons we added to the 'pokemon' Template,
>  since those were just for testing.
> Once we're done with those things we should be good to go, since the app can
>  now Create, Update, and Destroy!

### YOUR TURN : Updating an Existing Record

Let's give our app the ability to update an 'item'.
Suppose we want to make it so that when an 'item-row' is double-clicked, it
 toggles back and forth between being "editable" and "not editable", in much the
 same way that the 'pokemon-snippet' Component did.
When the 'item-row' Component is in its "editable" mode, the data values inside
 each `<td>` should be replaced with a form field (`<input>` for 'Name' and
 'Category', `<textarea>` for 'Effects') whose values are bound to the
 properties of the Component.
In either mode ("editable"/"not editable"), the 'X' button should be visible and
 should act normally.

## Additional Resources

-   [Ember API : Ember.ActionHandler](http://emberjs.com/api/classes/Ember.ActionHandler.html)
-   [Ember API : DS.store](http://emberjs.com/api/data/classes/DS.Store.html)

## [License](LICENSE)

Source code distributed under the MIT license. Text and other assets copyright
General Assembly, Inc., all rights reserved.
