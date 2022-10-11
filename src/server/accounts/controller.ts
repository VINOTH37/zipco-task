import { Context } from 'koa'
import { Accounts } from '../../entities'
import { AuthUser } from '../../lib/authentication'
import { AccountManager } from '../../managers'
import { AccountModel } from './model'

export class AccountController {
  private manager: AccountManager

  constructor(manager: AccountManager) {
    this.manager = manager
  }

  public async get(ctx: Context) {
    const userId = ctx.params.id
    const account = await this.manager.find(userId)

    ctx.body = new AccountModel(account)
    ctx.status = 200
  }

  public async getAll(ctx: Context) {
    // const authUser: AuthUser = ctx.state.user
    const limit = isNaN(ctx.query.limit) ? 10 : parseInt(ctx.query.limit, 10)
    const offset = isNaN(ctx.query.offset) ? 0 : parseInt(ctx.query.offset, 10)
    const accounts = await this.manager.findUserAccounts(limit, offset)

    ctx.body = accounts.map((t: Accounts) => new AccountModel(t))
    ctx.status = 200
  }

  public async create(ctx: Context) {
    const account: Accounts = ctx.request.body

    account.isApproved = false

    const newAccount = await this.manager.create(account)

    ctx.body = new AccountModel(newAccount)
    ctx.status = 201
    ctx.set('location', `/api/v1/accounts/${newAccount.id}`)
  }

  public async update(ctx: Context) {
    const accountDto = ctx.request.body
    const account = await this.manager.find(ctx.params.id)

    account.accountType = accountDto.accountType
    account.creditAmount = accountDto.creditAmount
    account.isApproved = accountDto.isApproved

    const updatedAccount = await this.manager.update(account)

    ctx.body = new AccountModel(updatedAccount)
    ctx.status = 200
  }

  public async delete(ctx: Context) {
    const authUser: AuthUser = ctx.state.user
    const id: number = ctx.params.id

    await this.manager.delete(authUser.id, id)

    ctx.status = 204
  }
}
