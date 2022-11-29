import { ICreateProduct } from '../models/ICreateProduct';
import { IFindProducts } from '../models/IFindProducts';
import { IProduct } from '../models/IProduct';

export interface IProductsRepository {
  findbyName(name: string): Promise<IProduct | undefined>;

  findbyId(id: string): Promise<IProduct | undefined>;

  findAll(): Promise<IProduct[]>;

  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;

  create(data: ICreateProduct): Promise<IProduct>;

  save(product: IProduct): Promise<IProduct>;

  remove(product: IProduct): Promise<void>;
}
