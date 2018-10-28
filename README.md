# dlocator

Dlocator is a version of [service locator pattern][slp] with dependencies and services. It look like dependency container combined with service locator.

### Installation

Dlocator requires [node](https://nodejs.org/) v4+ to run.
`npm install dlocator --save`

### How to use

  - Create modules
  - Any module can provide a service
  - Any module can use other services, specified in module dependencies

### API

```const Application = require('dlocator');```
Application is a class. Must get in constructor modules array and then init method must be called.

```const Module  = require('dlocator/module');```
Module is a class. You must extend your module from that class. If you need you can override init(gets locator and puts it into this._locator by default), afterInit(gets nothing, called when all inits finished) methods and _services(must return a map of providing servicies) and _dependecies(must return a set of servicies) properties.

### Example

Create Application(app.js):
```javascript
const Application = require('dlocator');
const modules = require('./modules/index.js');

const app = new Application(modules);
app.init();
```

Create 'Module1' with service 'test'(/modules/module1/index.js):
```javascript
const Module = require('dlocator/module');

module.exports = class Module1 extends Module {

    async afterInit() {
        this._locator.getService('bp')(5);
    }
    
    get test() {
        return {
            foo: 'bar'
        }
    }

    get _dependecies() {
        return new Set(['bp']);
    }

    get _services() {
        return new Map([
            ['test', this.test]
        ]);
    }

}
```

Create 'Module2' with service 'bp'(/modules/module2/index.js):
```javascript
const Module = require('dlocator/module');

module.exports = class Module2 extends Module {

    async afterInit() {
        console.dir(this._locator.getService('test').foo);
    }

    beepboop(num = 3) {
        for (let i = 0; i < num; i++) {
            console.log('beepboop');
        }
    }

    get _dependecies() {
        return new Set(['test']);
    }

    get _services() {
        return new Map([['bp', this.beepboop]]);
    }

}
```

Create modules list(/modules/index.js):
```javascript
const Module1 = require('./modules/module1');
const Module2 = require('./modules/module2');

module.exports = [
    Module1,
    Module2,
];
```

### Todos

 - Write Tests
 - Add Night Mode

License
----

ISC

[slp]: <https://designpatternsphp.readthedocs.io/en/latest/More/ServiceLocator/>
