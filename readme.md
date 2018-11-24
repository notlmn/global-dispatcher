# global-dispatcher

> Basically a global bare bones event emitter

- **Functional**: no `this` (for you poeple obsessed with FP)
- **Tiny**: 350 Bytes (min + gzip)
- **No transpilation required**: written in ES3, import directly
- **No constructor**: everything is [global](#why-global-by-default)
- Support [synchronous and asynchronous dispatches](#sync-and-async-dispatches)

## Import

- **CJS**: `const {subscribe, dispath} = require('global-dispatcher');`
- **ESM/Node**: `import {subscribe, dispath} from 'global-dispatcher';`
- **ESM/Unpkg**: `import {subscribe, dispath} from 'https://unpkg.com/global-dispatcher/min.esm.js';`

## Usage

### Basic

``` js
// Register a new subscription
subscribe('event', data => console.log(data));

// ...

// Somewhere else in the code land
dispatch('event', {
	a: 'b'
});
```

### Unsubscribing listeners

``` js
const unsub = subscribe('event', () => {});

// Calling `unsub` removes the specified listener from the list
unsub();
```


## Example

``` js
// list.js
import {subscribe} from 'global-dispatcher';

class List extends HTMLElement {
  connectedCallback() {
    subscribe('new-item', item => this.renderNewItem(item));
  }

  renderNewItem(item) {
    // ...
  }
}
```

``` js
// button.js
import {dispatch} from 'global-dispatcher';

class Button extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', () => {
      const randomString = (Math.random() * 1e16).toString(36);
      dispatch('new-item', randomString);
    });
  }
}
```

## FAQ

### Motivation

- Some modules require you to transpile for your target, you may end up having to transpile even when your original pipeline doesn't need one.
- They are not global (see below), or require singleton pattern files, even when you just need a single instance.

### Sync and Async dispatches

`dispatch(...)` by default calls the listeners asynchronously, to run listeners synchronously, use `dispathcSync(...)` instead.

### Why global by default?

Because when you create an instance of an emitter thingy in each of your component, there is no way for them to communicate with each other. This module follows the singleton pattern in a global level (expand below to see example).

<details>
<summary>Basically you need to have a common emitter object that all of your modules can import</summary>

Some people end up using hacks like the one below

``` js
// util/emitter.js
import eventEmitterConstructor from 'some-event-emitter-library';

export default eventEmitterConstructor();

// components/component1.js
import emitter from '../util/emitter.js'

// components/component2.js
import emitter from '../util/emitter.js'
```
</details>

### Why the name `global-dispather`

Because its global by default, not bound to any object/constructor. And you do not emit or subscribe to events on an emitter object, so it ended up being a dispatcher.


## License

[MIT](license)
