import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import uploadConfig from '@config/upload';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { IUser } from '../domain/models/IUser';

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IUpdateUserAvatar): Promise<IUser> {
    const user = await this.userRepository.findbyId(user_id);
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

    await this.userRepository.save(user);
    return user;
  }
}
