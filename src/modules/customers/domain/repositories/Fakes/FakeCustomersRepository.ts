import { v4 as uuidv4 } from 'uuid';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepositorys';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

export default class FakeCustomersRepository
  implements Omit<ICustomersRepository, 'findAll' | 'remove'>
{
  private customers: Customer[];
  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    Object.assign(this.customers, customer);
    return customer;
  }

  // public async remove(customer: Customer): Promise<void> {}

  // public async findAll(): Promise<Customer[] | undefined> {}

  public async findbyName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }

  public async findbyId(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }

  public async findbyEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }
}
