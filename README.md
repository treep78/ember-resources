[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Ember Resources

One of the chief advantages of having a front-end framework is being able to
store and manipulate data entirely on the front-end, without needing to
explicitly make AJAX requests. This is accomplished through a data layer, which
for Ember is a library called ember-data. In this session, we'll look at how to
use ember-data to set up front-end models and perform CRUD actions on them.

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
1.  Run `npm install` and `bower install`.

1.  Clone [listr-api](https://github.com/ga-wdi-boston/listr-api) into a
    separate directory on your machine and follow the instructions for the API.
1.  Run `bundle exec rake db:nuke_pave` to setup or reset the database.

## ember-data and CRUD

In the past few days, you've seen a whole lot of Ember's 'view' layer - the
system governing how Ember responds to user behavior and controls what HTML gets
rendered in the browser.

While this is all very nice, it's meaningless without a back-end. That's where
Ember's 'data' layer comes in, as implemented by an add-on library to Ember
called `ember-data`.

`ember-data` provides several Ember Classes for handling the interchange of
information between the front-end and the back-end, most notably Models (which
represent back-end resources as Ember Objects) and Adapters (which manage the
actual interactions with the underlying APIs).

### Code-Along: Making a List Model

To establish a line of communication with this API, we're going to need an
 **Adapter**.

```bash
ember generate adapter application
```

```bash
ember generate model list
```

This will create a new `model.js` file inside `app/list`. Here is where we'll
need to specify all of the properties that we want the model to have. If we look
at the JSON data coming from the API, we can see that there are a number of
properties being returned. We can pick whichever of these we want to include in
the model, but for the sake of being completionists, let's add _all_ of the
properties.

`DS.attr` is how we define attributes for our models. The default types are
'number', 'string', 'boolean', and 'date', but you can define your own if you
really need to. You can also use `DS.attr` to specify a default value for a
given attribute by passing in an optional object as a second argument.

As you saw in the material on routing, each Route has a `model` function that
exposes data to the templates. Each Route has a `store` property which refers to
whatever data store your application is using (in this case, ember-data), so to
make the List model available in the `lists` route, we reference the store
and query it for all instances.

```js
export default Ember.Route.extend({
  model: function(){
    return this.get('store').findAll('list');
  }
});
```

### Lab: Use the List Model in A Singular Route

## Ember CRUD - Data Down, Actions Up (DDAU)

Now that we have models loaded in our Routes, it's finally time to tie all of
this together.

Before talking about CRUD, though, we should start by talking about something
you touched on in the material on Components: 'actions'. 'Actions' are a special
class of trigger-able events that are handled by the `Ember.ActionHandler` Ember
Class. Like normal events, actions 'bubble up', moving from the leaf (i.e.
Template) to the root (i.e. the 'application' Route) until they are met by a
matching handler.

In Ember 1, action handlers inside the Controller were used to perform CRUD on
the model. This made sense, since the Controller was responsible for managing
all of the business data in our application, and since it mirrored how
responsibilities were broken out in Rails. An action could be triggered in a
Template and bubble up to a Controller, where it would cause that Controller to
manipulate the given Model.

However, with the shift towards Components in Ember 2, a lot of the
functionality of Controllers has been made redundant and moved into other
entities within the app. In this case, Components and Routes both incorporate
`Ember.ActionHandler`, so we can instead set our action handlers there. For
simplicity's sake, we'll put all handlers related to Model CRUD into the Route;
any other action handlers can be placed in either place.

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

In Ember applications that use Components (which will soon be all of them) the
generally recommended strategy is to follow a 'data down, actions up' design
pattern, which essentially means two things:

1.  All Components look to their parent element as a source of data to bind to;
    as a result, data changes propagate 'downwards' from parent to child.
1.  Implicit in the first point is that all changes to date place in the parent.
    In order to effect changes to the data in a parent element, Components
    trigger their parents' actions; in this fashion, action invocations
    propagate 'upwards' from child to parent.

## Code-Along: Handling UI State

## Additional Resources

-   [Ember API : Ember.ActionHandler](http://emberjs.com/api/classes/Ember.ActionHandler.html)
-   [Ember API : DS.store](http://emberjs.com/api/data/classes/DS.Store.html)

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
