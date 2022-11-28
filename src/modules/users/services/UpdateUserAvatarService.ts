import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import uploadConfig from '@config/upload';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findbyId(user_id);
    if (!user) {
      throw new AppError('User not found.');
    }

    if (uploadConfig.driver == 's3') {
      const storageProvider = new S3StorageProvider();
      if (user.avatar) {
        await storageProvider.deletefile(user.avatar);
      }

      const fileName = await storageProvider.savefile(avatarFilename);
      user.avatar = fileName;
    } else {
      const storageProvider = new DiskStorageProvider();

      if (user.avatar) {
        await storageProvider.deletefile(user.avatar);
      }
      const fileName = await storageProvider.savefile(avatarFilename);

      user.avatar = fileName;
    }

    await usersRepository.save(user);
    return user;
  }
}
