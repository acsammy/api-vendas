import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const userRoutes = Router();
const userController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

userRoutes.get('/', isAuthenticated, userController.index);

userRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

userRoutes.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default userRoutes;
