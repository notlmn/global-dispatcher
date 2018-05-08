# global-dispatcher
> A mini module to handle global level events (or to pass data between components)

## Usage
``` js
// Register a new subscription
subscribe('event', (...args) => console.log(...args));

// ...

// Somewhere else in the code land
dispatch('event', 'a', 'b');
```

Usage with `unsubscribe()`:
``` js
const unsub = subscribe('event', () => {});

// Calling `unsub` removes the specified callback from the list
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

## License
[MIT](license)
