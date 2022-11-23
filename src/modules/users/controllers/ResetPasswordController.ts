import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;
    const resetPaswordEmail = new ResetPasswordService();

    await resetPaswordEmail.execute({ password, token });

    return response.status(204).json();
  }
}
