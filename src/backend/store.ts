import { Container } from 'js-data';
import { RethinkDBAdapter } from 'js-data-rethinkdb';
import * as schemas from '../shared/schemas';
import * as relations from '../shared/relations';

class AppDBAdapter extends RethinkDBAdapter {
  // async afterCreate (mapper, props, opts, record) {
  //   super.afterCreate(mapper, props, opts, record);
  //   // Add the newly created record to the Redis cache
  //   await redisAdapter.create(mapper, record);
  // }
}

const adapter = new AppDBAdapter();
const store = new Container();

// Adapters registered with the Container are shared
// by all Mappers in the Container.
store.registerAdapter('adapter', adapter, { 'default': true });

store.defineMapper('user', {
  table: 'users',
  schema: schemas.user,
  relations: relations.user
});
store.defineMapper('post', {
  table: 'posts',
  schema: schemas.post,
  relations: relations.post
});
store.defineMapper('comment', {
  table: 'comments',
  schema: schemas.comment,
  relations: relations.comment
});

export default store;