import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IShowUser } from '../domain/models/IShowUser';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IShowUser): Promise<IUser> {
    const user = await this.userRepository.findbyId(user_id);
    if (!user) {
      throw new AppError('User not found');
    }
    return user;
  }
}
