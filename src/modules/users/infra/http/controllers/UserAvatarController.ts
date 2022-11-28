import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename as string,
    });

    return response.json(instanceToInstance(user));
  }
}
