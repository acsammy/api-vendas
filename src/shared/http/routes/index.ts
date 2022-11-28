import customerssRoutes from '@modules/customers/infra/http/routes/customers.routes';
import orderRoutes from '@modules/orders/infra/http/routes/orders.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';
import profileRoutes from '@modules/users/infra/http/routes/profile.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import userRoutes from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', userRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/password', passwordRoutes);
routes.use('/profile', profileRoutes);
routes.use('/customers', customerssRoutes);
routes.use('/orders', orderRoutes);

routes.get('/', (request, response) => {
  return response.json({
    message: 'Hello World',
  });
});

export default routes;
