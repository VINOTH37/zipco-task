import { Accounts } from '../../entities'

export interface CreateAccount {
  accountType: string
  creditAmount: string
  userId:number
}

export class AccountModel {
  public id?: number
  public accountType: string
  public creditAmount: string
  public userId:number
  public isApproved: boolean
  public created: Date
  public updated: Date

  constructor(account: Accounts) {
    this.id = account.id
    this.accountType = account.accountType
    this.creditAmount = account.creditAmount
    this.userId =  account.userId
    this.isApproved = account.isApproved
    this.created = account.created
    this.updated = account.updated
  }
}
