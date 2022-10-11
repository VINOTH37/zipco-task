import { Accounts } from '../entities'
import { AccountRepository } from '../repositories'

export class AccountManager {
  private repo: AccountRepository

  constructor(repo: AccountRepository) {
    this.repo = repo
  }

  public find(userId: number): Promise<Accounts> {
    return this.repo.find(userId)
  }

  public async findUserAccounts(
    limit: number,
    offset: number
  ): Promise<Accounts[]> {
    return this.repo.findByUser( limit, offset)
  }

  public create(account: Accounts): Promise<Accounts> {
    return this.repo.insert(account)
  }

  public update(account: Accounts): Promise<Accounts> {
    return this.repo.update(account)
  }

  public delete(userId: number, accountId: number): Promise<void> {
    return this.repo.delete(userId, accountId)
  }
}
