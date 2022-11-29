import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = await this.ormRepository.create({ name, email, password });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    await this.ormRepository.save(user);
    return user;
  }

  public async findAll(): Promise<IUser[]> {
    const users = await this.ormRepository.find();
    return users;
  }

  public async findbyName(name: string): Promise<IUser | undefined> {
    const user = this.ormRepository.findOne({ where: { name } });
    return user;
  }

  public async findbyId(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { id } });
    return user;
  }

  public async findbyEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { email } });
    return user;
  }
}
