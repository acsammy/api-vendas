import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';

const orderRoutes = Router();
const ordersController = new OrdersController();

orderRoutes.use(isAuthenticated);

orderRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

orderRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
);

export default orderRoutes;
