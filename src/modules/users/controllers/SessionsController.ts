import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

export default class SessionsController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;
    const createSesssion = new CreateSessionService();
    const user = await createSesssion.execute({ email, password });

    return response.json(instanceToInstance(user));
  }
}
