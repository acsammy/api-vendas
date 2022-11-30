import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from '../CreateUserService';
import { FaketHashProvider } from '@modules/users/providers/HashProvider/fakes/FaketHashProvider';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';

let fakeUserRepository: FakeUsersRepository;
let createUser: CreateUserService;
let hashProvider: FaketHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    hashProvider = new FaketHashProvider();
    createUser = new CreateUserService(fakeUserRepository, hashProvider);
  });

  it('should be able to create a new user.', async () => {
    const user = await createUser.execute({
      name: 'Samuel Carvalho',
      email: 'samuel@samuel.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with same email.', async () => {
    await createUser.execute({
      name: 'Samuel Carvalho',
      email: 'samuel@samuel.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Samuel Alves',
        email: 'samuel@samuel.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
