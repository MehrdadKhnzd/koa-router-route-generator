# koa-router-route-generator

A tiny utility for defining [koa-router](https://github.com/koajs/router) routes in a simpler way, while having the ability to combine multiple routes.

## Installation

```
$ npm install koa-router-route-generator
```

## Usage

### app.js

```javascript
const Koa = require('koa');
const router = require('./router');

const app = new Koa();

app
  .use(router.routes())
  .use(router.allowedMethods());
```

### router.js

```javascript
const Router = require('@koa/router');
const routeGenerator = require('koa-router-route-generator');


const dogRouter = {
  get: {
    '/dogs/:name': async ctx => {
      ctx.body = `${ctx.params.name} is a good dog.`;
    }
  },
  post: {
    '/dogs': [
      async (ctx, next) => {
        ctx.body = 'Hey';
        await next();
      },
      async ctx => console.log('You!');
    ]
  }
};

const catRouter = {
  get: {
    '/cats': ctx => ctx.body = 'Cats!'
  }
};

const router = new Router();

routeGenerator(router, [
  dogRouter,
  catRouter
]);

module.exports = router;
```

## API

### Route Defenition

| Param | Type | Description |
| - | - | - |
| method | `String` | Allowed method (get, post, etc.). |
| route | `String` | Route path (all valid paths in [koa-router](https://github.com/koajs/router)). |
| handler | `function` \| `function[]` | Route Middleware(s) |

```javascript
{
  method: {
    path: handler,
    // More paths here!
  },
  // More methods here!
}
```

### Binding Routes to `koa-router` Instance

| Param | Type | Description |
| - | - | - |
| router | `Router` | `koa-router` instance. |
| routes | `Object[]` \| `Object` | An array of routes or a single route. |

```javascript
routeGenerator(router, routes)
```