import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepositorys';
import { getRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

export default class CustomersRepository implements ICustomersRepository {
  private orm_repository: Repository<Customer>;
  constructor() {
    this.orm_repository = getRepository(Customer);
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.orm_repository.create({ name, email });
    await this.orm_repository.save(customer);
    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.orm_repository.save(customer);
    return customer;
  }

  public async findbyName(name: string): Promise<Customer | undefined> {
    const customer = this.orm_repository.findOne({ where: { name } });
    return customer;
  }

  public async findbyId(id: string): Promise<Customer | undefined> {
    const customer = this.orm_repository.findOne({ where: { id } });
    return customer;
  }

  public async findbyEmail(email: string): Promise<Customer | undefined> {
    const customer = this.orm_repository.findOne({ where: { email } });
    return customer;
  }
}
