import * as pino from 'pino'
import * as supertest from 'supertest'
import { createContainer } from '../../src/container'
import { createServer } from '../../src/server'
import { CreateAccount, AccountModel } from '../../src/server/accounts/model'
import { CreateUser, UserModel } from '../../src/server/users/model'
import { database } from './database-utils'

const logger = pino({ name: 'test', level: 'silent' })
const container = createContainer(database, logger)
const port = Number(process.env.PORT) || 5000

export const appServer = createServer(container)
export const testServer = appServer.listen(port)

export async function createUserTest(user: CreateUser): Promise<UserModel> {
  const res = await supertest(testServer)
    .post('/api/v1/users')
    .send(user)
    .expect(201)

  return res.body
}

export function shuttingDown(): void {
  container.health.shuttingDown()
}

export async function createAccountTest(
  account: CreateAccount
): Promise<AccountModel> {
  const res = await supertest(testServer)
    .post('/api/v1/accounts')
    .send(account)
    .expect(201)

  return res.body
}

