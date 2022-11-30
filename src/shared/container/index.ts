import { container } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepositorys';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/entities/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { OrdersRepository } from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import '@modules/users/providers';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
