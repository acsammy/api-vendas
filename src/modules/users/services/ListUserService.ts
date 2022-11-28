import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

export default class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UsersRepository);
    const users = await userRepository.find();
    return users;
  }
}
