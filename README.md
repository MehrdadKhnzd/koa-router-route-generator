# koa-router-route-generator

A tiny utility for defining [koa-router](https://github.com/koajs/router) routes in a simpler way, while having the ability to combine multiple routes.

## Installation

```
$ npm install koa-router-route-generator
```
## Whats new in v2.0.0?

Added nested route and route naming support. See below for more information.

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
    '/cats': {
      name: 'cats',
      handler: ctx => ctx.body = 'Cats!',
      children: {
        '/are-cute': [
          ctx => ctx.state.cats = 'Cats!',
          ctx => ctx.body = 'Cats are cute!'
        ],
        '/deeper': {
          // The paths that doesn't have 'handler'
          // will not be extracted as seperate routes!
          name: 'deeper',
          children: {
            '/child': ctx => ctx.body = 'Deeper Childs!'
          }
        }
      }
    }
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
| path | `String` | Route path (all valid paths in [koa-router](https://github.com/koajs/router)). |
| handler | `function` \| `function[]` | Route Middleware(s). |
| name | `String?` | `name` parameter in [koa-router](https://github.com/koajs/router). |
| children | `Route` | Route object as itself.

```javascript
{
  method: {
    path: handler,
    // or
    objectPath: {
      name: pathName,
      hander: handler,
      children: children
    }
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