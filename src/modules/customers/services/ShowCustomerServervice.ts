import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IShowCustomer } from '../domain/models/IShowCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepositorys';
import Customer from '../infra/typeorm/entities/Customer';

@injectable()
export default class ShowCustomerServervice {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findbyId(id);
    if (!customer) {
      throw new AppError('Customer not found');
    }
    return customer;
  }
}
