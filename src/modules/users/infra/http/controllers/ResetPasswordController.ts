import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { Request, Response } from 'express';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;
    const resetPaswordEmail = new ResetPasswordService();

    await resetPaswordEmail.execute({ password, token });

    return response.status(204).json();
  }
}
