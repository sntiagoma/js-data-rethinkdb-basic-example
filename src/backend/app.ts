import Koa, {Context} from 'koa';
import Router from 'koa-router';
import Body from 'koa-body';
import Serve from 'koa-static';
import Logger from 'koa-logger';

import { r } from 'rethinkdb-ts';
import { readFile } from 'fs';
import { promisify } from 'util';

import store from './store';
import { Mapper } from 'js-data';

const app = new Koa();
const router = new Router({prefix: '/api'});
const distFolder = __dirname + '/../../dist';

app.use(Logger());
app.use(Serve(distFolder));
app.use(Body());

// router.get('/info', async (ctx) => {
//   ctx.body = //'Hello World!';
//   await r.db('rethinkdb').info().run(await pool);
//   ctx.set('Content-Type', 'text/html');
// });


const User : Mapper = store.getMapper('user');

router
  .get('/users', async (ctx: Context) => {
    const qs = {...ctx.query};
    ctx.body = await User.findAll(qs);
  })
  .get('/users/:id', async (ctx: Context) => {
    ctx.body = await User.find(ctx.params.id);
  })
  .post('/users', async (ctx: Context) => {
    const data = ctx.request.body;
    const isArray = data instanceof Array;
    const promise = isArray ? User.createMany(data) : User.create(data);
    ctx.body = await promise;
  })
  .put('/users', async (ctx: Context) => {
    const data = ctx.request.body;
    const qs = {...ctx.query};
    const isArray = data instanceof Array;
    const promise = isArray ? User.updateMany(data) : User.updateAll(data, qs);
    ctx.body = await promise;
  })
  .put('/users/:id', async (ctx: Context) => {
    ctx.body = await User.update(ctx.params.id, ctx.request.body);
  })
  .delete('/users', async (ctx: Context) => {
    const qs = {...ctx.query};
    ctx.body = await User.destroyAll(qs);
  })
  .delete('/users/:id', async (ctx: Context) => {
    ctx.body = await User.destroy(ctx.params.id);
  })

app.use(router.routes());
app.use(router.allowedMethods());

export default app