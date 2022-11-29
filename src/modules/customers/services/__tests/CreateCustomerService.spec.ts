import 'reflect-metadata';
import FakeCustomersRepository from '@modules/customers/domain/repositories/Fakes/FakeCustomersRepository';
import '../CreateCustomerService';
import CreateCustomerService from '../CreateCustomerService';

describe('CreateCustomer', () => {
  it('should be able to create a new customer.', async () => {
    const fakeCustomerRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomerService(fakeCustomerRepository);

    const customer = await createCustomer.execute({
      name: 'Samuel Carvalho',
      email: 'samuel@samuel.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customer with same email.', async () => {
    const fakeCustomerRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomerService(fakeCustomerRepository);

    const customer = await createCustomer.execute({
      name: 'Samuel Carvalho',
      email: 'samuel@samuel.com',
    });

    expect(customer).toHaveProperty('id');
  });
});
