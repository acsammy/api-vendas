import EtherealMail from '@config/mail/EtherealMail';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

interface IUser {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IUser): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findbyEmail(email);
    if (!user) {
      throw new AppError('User not exists.');
    }
    const token = await userTokenRepository.generate(user.id);

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API VENDAS] Recuperação de senha',
      templateData: {
        template: `Olá {{name}}: {{token}} `,
        variables: {
          name: user.name,
          token: token.token,
        },
      },
    });
  }
}
