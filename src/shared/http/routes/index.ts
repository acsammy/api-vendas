import customerssRoutes from '@modules/customers/routes/customers.routes';
import orderRoutes from '@modules/orders/routes/orders.routes';
import productsRouter from '@modules/products/routes/products.routes';
import passwordRoutes from '@modules/users/routes/password.routes';
import profileRoutes from '@modules/users/routes/profile.routes';
import sessionsRoutes from '@modules/users/routes/sessions.routes';
import userRoutes from '@modules/users/routes/users.routes';
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
