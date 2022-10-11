import { expect } from 'chai'
import * as supertest from 'supertest'
import { truncateTables } from '../../database-utils'
import {
  createAccountTest,
  createUserTest,
  testServer
} from '../../server-utils'

describe('GET /api/v1/accounts/:id', () => {
  let createdUserAccount;
  before(async () => {
    await truncateTables(['account', 'user'])

    const user = {
      email: 'dude@gmail.com',
      firstName: 'super',
      lastName: 'mocha',
      monthlySalary: 1000,
      monthlyExpense: 0
    }

     createdUserAccount = await createUserTest(user)
  })

  
  it('Should return a single account', async () => {
    const account = {
      accountType: 'Loan',
      creditAmount: '$8000',
      userId: createdUserAccount.id
    }

    const createdTask = await createAccountTest(account)

    const res = await supertest(testServer)
      .get(`/api/v1/accounts/${createdTask.userId}`)
      .expect(200)

    expect(res.body).includes({
      accountType: 'Loan',
      creditAmount: '$8000',
      isApproved: false
    })
  })

  it('Should return 404 when account does not exist', async () => {
    await supertest(testServer)
      .get(`/api/v1/accounts/111111111`)
      .expect(404)
  })

})
