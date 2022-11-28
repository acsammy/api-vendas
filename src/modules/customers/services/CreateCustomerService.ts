import AppError from '@shared/errors/AppError';
import { Injectable, inject } from 'tsyringe';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepositorys';

@Injectable()
export default class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customersRepository.findbyEmail(email);

    if (emailExists) {
      throw new AppError('Email address already in use.');
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}
