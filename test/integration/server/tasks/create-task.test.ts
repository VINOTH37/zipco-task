import { expect } from 'chai'
import * as supertest from 'supertest'
import { truncateTables } from '../../database-utils'
import { createUserTest, testServer } from '../../server-utils'

describe('POST /api/v1/accounts', () => {
  let testData;
  before(async () => {
    await truncateTables(['account', 'user'])

    const user = {
      email: 'dude@gmail.com',
      firstName: 'super',
      lastName: 'mocha',
      monthlySalary: 1000,
      monthlyExpense: 0
    }

    testData = await createUserTest(user)
  })

  it('Should create a account and return 201', async () => {
    const account = {
      accountType: 'Loan',
      creditAmount: '$8000',
      userId:testData.id
    }

    const res = await supertest(testServer)
      .post('/api/v1/accounts')
      .send(account)
      .expect(201)

    expect(res.header.location).equals(`/api/v1/accounts/${res.body.id}`)
    expect(res.body).include({
      accountType: 'Loan',
      creditAmount: '$8000',
      isApproved: false
    })
  })

  it('Should return 400 when missing body data', async () => {
    const account = {
      accountType: 'Loan'
    }

    const res = await supertest(testServer)
      .post('/api/v1/accounts')
      .send(account)
      .expect(400)

    expect(res.body.code).equals(400)
    expect(res.body.fields.length).equals(1)
    expect(res.body.fields[0].message).eql('"creditAmount" is required')
  })

})
