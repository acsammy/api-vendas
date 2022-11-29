import EtherealMail from '@config/mail/EtherealMail';
import mailConfig from '@config/mail/mail';
import sesMail from '@config/mail/SESMail';
import AppError from '@shared/errors/AppError';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import { ISendForgotPasswordEmail } from '../domain/models/ISendForgotPasswordEmail';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
    const user = await this.userRepository.findbyEmail(email);
    if (!user) {
      throw new AppError('User not exists.');
    }
    const token = await this.userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    if (mailConfig.driver === 'ses') {
      await sesMail.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: '[API VENDAS] Recuperação de senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/reset_password/token=${token.token}`,
          },
        },
      });
      return;
    }

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API VENDAS] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password/token=${token.token}`,
        },
      },
    });
  }
}
