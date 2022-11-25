import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const storageProvider = new DiskStorageProvider();

    const user = await usersRepository.findbyId(user_id);
    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      await storageProvider.deletefile(user.avatar);
    }

    const fileName = await storageProvider.savefile(avatarFilename);

    user.avatar = fileName;

    await usersRepository.save(user);
    return user;
  }
}
