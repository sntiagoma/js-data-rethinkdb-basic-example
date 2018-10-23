import { DataStore } from 'js-data';
import { HttpAdapter } from 'js-data-http';
import * as schemas from '../shared/schemas';
import * as relations from '../shared/relations';

const adapter = new HttpAdapter({
  basePath: '/api'
});
const store = new DataStore();

// Adapters registered with the Container are shared
// by all Mappers in the Container.
store.registerAdapter('http', adapter, { 'default': true});

store.defineMapper('user', {
  endpoint: 'users',
  schema: schemas.user,
  relations: relations.user
});
store.defineMapper('post', {
  endpoint: 'posts',
  schema: schemas.post,
  relations: relations.post
});
store.defineMapper('comment', {
  endpoint: 'comments',
  schema: schemas.comment,
  relations: relations.comment
});

export default store;