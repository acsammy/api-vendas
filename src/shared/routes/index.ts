import productsRouter from '@modules/products/routes/products.routes';
import sessionsRoutes from '@modules/users/routes/sessions.routes';
import userRoutes from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', userRoutes);
routes.use('/sessions', sessionsRoutes);

routes.get('/', (request, response) => {
  return response.json({
    message: 'Hello World',
  });
});

export default routes;
