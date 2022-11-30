import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { FaketHashProvider } from '@modules/users/providers/HashProvider/fakes/FaketHashProvider';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import CreateSessionService from '../CreateSessionService';

let fakeUserRepository: FakeUsersRepository;
let createSession: CreateSessionService;
let hashProvider: FaketHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    hashProvider = new FaketHashProvider();
    createSession = new CreateSessionService(fakeUserRepository, hashProvider);
  });

  it('should be able to authenticate.', async () => {
    const user = await fakeUserRepository.create({
      name: 'Samuel Carvalho',
      email: 'samuel@samuel.com',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'samuel@samuel.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with inexistent user.', async () => {
    expect(
      createSession.execute({
        email: 'samuel@samuel.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password.', async () => {
    const user = await fakeUserRepository.create({
      name: 'Samuel Carvalho',
      email: 'samuel@samuel.com',
      password: '123456',
    });

    expect(
      createSession.execute({
        email: 'samuel@samuel.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
