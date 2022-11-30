import 'reflect-metadata';
import FakeCustomersRepository from '@modules/customers/domain/repositories/Fakes/FakeCustomersRepository';
import '../CreateCustomerService';
import CreateCustomerService from '../CreateCustomerService';
import AppError from '@shared/errors/AppError';

let fakeCustomerRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomerRepository);
  });

  it('should be able to create a new customer.', async () => {
    const customer = await createCustomer.execute({
      name: 'Samuel Carvalho',
      email: 'samuel@samuel.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customer with same email.', async () => {
    await createCustomer.execute({
      name: 'Samuel Carvalho',
      email: 'samuel@samuel.com',
    });

    expect(
      createCustomer.execute({
        name: 'Samuel Alves',
        email: 'samuel@samuel.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
