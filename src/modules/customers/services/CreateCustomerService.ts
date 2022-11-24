import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface ICustomer {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: ICustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findbyEmail(email);

    if (emailExists) {
      throw new AppError('Email address already in use.');
    }

    const customer = customersRepository.create({
      name,
      email,
    });
    await customersRepository.save(customer);

    return customer;
  }
}
