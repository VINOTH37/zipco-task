import { expect } from 'chai'
import * as supertest from 'supertest'
import { truncateTables } from '../../database-utils'
import { createUserTest, testServer } from '../../server-utils'

describe('GET /api/v1/users', () => {
  beforeEach(async () => {
    await truncateTables(['account','user'])

    const user = {
      email: 'dude@gmail.com',
      firstName: 'super',
      lastName: 'test',
      monthlySalary: 1000,
      monthlyExpense: 0
    }

    await createUserTest(user)
  })

  it('Should return user information', async () => {
    const res = await supertest(testServer)
      .get('/api/v1/users')
      .expect(200)
    
    expect(res.body[0]).keys([
      'id',
      'email',
      'firstName',
      'lastName',
      'monthlyExpense',
      'monthlySalary',
      'created',
      'updated'
    ])
  })
})
