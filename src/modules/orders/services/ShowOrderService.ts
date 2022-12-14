import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../infra/typeorm/entities/Order';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}

export default class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrdersRepository);

    const order = await orderRepository.findbyId(id);
    if (!order) {
      throw new AppError(`Order not found.`);
    }

    return order;
  }
}
