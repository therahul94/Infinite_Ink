import { Hono } from 'hono';
import router from './Routes/route';

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1', router);

export default app
