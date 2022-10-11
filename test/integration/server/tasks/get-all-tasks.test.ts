import { expect } from 'chai'
import * as supertest from 'supertest'
import { truncateTables } from '../../database-utils'
import {
  createAccountTest,
  createUserTest,
  testServer
} from '../../server-utils'

describe('GET /api/v1/accounts', () => {
  let userDto1;
  let userDto2;
  before(async () => {
    await truncateTables(['account', 'user'])

    const user1 = {
      email: 'dude@gmail.com',
      firstName: 'super',
      lastName: 'mocha',
      monthlySalary: 1000,
      monthlyExpense: 0
    }

    const user2 = {
      email: 'dude1@gmail.com',
      firstName: 'super',
      lastName: 'mocha',
      monthlySalary: 1000,
      monthlyExpense: 0
    }

    userDto1 = await createUserTest(user1)
    userDto2 = await createUserTest(user2)
  })

  it('Should return a list of accounts', async () => {

    const account1 = {
      accountType: 'Loan',
      creditAmount: '$9000',
      userId: userDto1.id
    }

    const account2 = {
      accountType: 'Credit',
      creditAmount: '$5000',
      userId:userDto2.id
    }
    
    await createAccountTest(account1)
    await createAccountTest(account2)

    const res = await supertest(testServer)
      .get('/api/v1/accounts')
      .expect(200)

    expect(res.body.length).equals(2)
    expect(res.body[0].accountType).equals('Loan')
    expect(res.body[1].accountType).equals('Credit')
  })


})
