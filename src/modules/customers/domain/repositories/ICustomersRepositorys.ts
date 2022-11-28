import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';

export interface ICustomersRepository {
  findbyName(name: string): Promise<ICustomer | undefined>;

  findbyId(id: string): Promise<ICustomer | undefined>;

  findbyEmail(email: string): Promise<ICustomer | undefined>;

  create(data: ICreateCustomer): Promise<ICustomer>;

  save(customer: ICustomer): Promise<ICustomer>;
}
