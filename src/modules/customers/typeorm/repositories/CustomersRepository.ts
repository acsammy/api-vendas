import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
export default class CustomersRepository extends Repository<Customer> {
  public async findbyName(name: string): Promise<Customer | undefined> {
    const customer = this.findOne({ where: { name } });
    return customer;
  }

  public async findbyId(id: string): Promise<Customer | undefined> {
    const customer = this.findOne({ where: { id } });
    return customer;
  }

  public async findbyEmail(email: string): Promise<Customer | undefined> {
    const customer = this.findOne({ where: { email } });
    return customer;
  }
}
