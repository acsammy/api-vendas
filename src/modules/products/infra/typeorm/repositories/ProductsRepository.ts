import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findbyName(name: string): Promise<Product | undefined> {
    const product = this.findOne({ where: { name } });
    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);
    const productsExists = await this.find({
      where: {
        id: In(productIds),
      },
    });

    return productsExists;
  }
}