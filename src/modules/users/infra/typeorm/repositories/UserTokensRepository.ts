import { IUserToken } from '@modules/users/domain/models/IUserToken';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

export class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<IUserToken | undefined> {
    const userToken = this.ormRepository.findOne({ where: { token } });
    return userToken;
  }

  public async findbyToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.ormRepository.findOne({ where: { token } });
    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({ user_id });
    await this.ormRepository.save(userToken);
    return userToken;
  }
}
