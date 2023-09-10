# dom-attach

<!-- [![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![Codecov][codecov-src]][codecov-href] -->

`dom-attach` is a simple, but batteries-included, library for attaching custom JavaScript / TypeScript logic to your DOM elements. It's inspired by libraries like [Stimulus.js](https://stimulus.hotwired.dev/).

## Quick Start

Install package:

```sh
# npm
npm install dom-attach

# yarn
yarn add dom-attach

# pnpm
pnpm install dom-attach
```

and then import `dom-attach` in your JavaScript / TypeScript code:

```js
// ESM
import "dom-attach";
```

Alternatively, you can use the CDN version:

```html
<script src="https://unpkg.com/dom-attach/dist/dom-attach.min.js"></script>
```
### Writing your first controller

The concept is pretty straightforward. You define custom controllers as plain old JavaScript classes. A controllers constructor get's called whenever a controller gets mounted to a DOM element. The constructor receives the DOM element as it's only argument. You can then use the constructor to attach event listeners to the DOM element, or do whatever else you need to do. The controller class can also define a `destroy` method, which will be called whenever the controller is unmounted from the DOM element. This is useful for cleaning up event listeners, or other resources.

```typescript
// hello-world-controller.js
export default class HelloWorldController {
  constructor(element) {
    this.element = element
  }

  connect() {
    this.element.innerText = 'Hello world from inside the controller!'
  }
}
```

```html
<div data-controller="hello-world">This is the default content.</div>
<script
  data-controller-name="hello-world"
  src="hello-world-controller.js"
  type="module"
></script>
```

You can also define inline controllers by inlining the controller class inside the `<script data-controller-name="...">` tag. This is useful for small controllers, or for prototyping.

```html
<div data-controller="hello-world">This is the default content.</div>

<script data-controller-name="hello-world" type="module">
  export default class HelloWorldController {
    constructor(element) {
      this.element = element
    }

    connect() {
      this.element.innerText = 'Hello world from inside the controller!'
    }
  }
</script>
```

### Controller Lifecycle

A controller can define a `connect` method, which will be called whenever the controller is mounted to a DOM element. This is useful for attaching event listeners, or doing other setup work.

Optionally, a controller can define a `destroy` method, which will be called whenever the controller is unmounted from a DOM element. This is useful for cleaning up event listeners, or other resources.


### Extending `Controller`

Your controllers can (or _should_) also extend the `Controller` class, which provides some useful methods for interacting with the DOM element.

```typescript
import { Controller } from 'dom-attach/controller'

export default class AnotherExampleController extends Controller {
  // We can omit the constructor as it's defined in the base class.

  connect() {
    // Use all sorts of helper methods to interact with the DOM element.
  }
}
```

| Name                          | Description                                                                                        | Type                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `element`                     | The DOM element the controller is mounted to.                                                      | `HTMLElement`                                          |
| `dispatch(eventName, detail)` | Dispatches a custom event on the DOM element.                                                      | `(eventName: string, detail?: any) => void`            |
| `on(eventName, callback)`     | Adds an event listener to the DOM element.                                                         | `(eventName: string, callback: EventListener) => void` |
| `once(eventName, callback)`   | Adds an event listener to the DOM element, which will be removed after the first time it's called. | `(eventName: string, callback: EventListener) => void` |
| `off(eventName, callback)`    | Removes an event listener from the DOM element.                                                    | `(eventName: string, callback: EventListener) => void` |


## Development

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Made with 💜 by [uberman](https://uberman.io/)

Published under [MIT License](./LICENSE).

<!-- Badges -->

<!-- [npm-version-src]: https://img.shields.io/npm/v/dom-attach?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/dom-attach
[npm-downloads-src]: https://img.shields.io/npm/dm/dom-attach?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/dom-attach
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/dom-attach/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/dom-attach
[bundle-src]: https://img.shields.io/bundlephobia/minzip/dom-attach?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=dom-attach -->
