import { Hono } from 'hono';
import router from './Routes/route';
import { cors } from 'hono/cors';

const app = new Hono()

app.use('/*', cors())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1', router);

export default app
