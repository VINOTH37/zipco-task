import { Accounts } from '../entities'
import { NotFoundError,UserUnauthorizedError,ValidationError } from '../errors'
import { MySql } from '../lib/database'
import * as _ from "lodash";

export class AccountRepository {
  private readonly TABLE: string = 'account'
  private readonly USER_TABLE: string = 'user'
  private db: MySql

  constructor(db: MySql) {
    this.db = db
  }

  public async find(userId: number): Promise<Accounts> {
    const conn = await this.db.getConnection()
    const row = await conn
      .select()
      .from(this.TABLE)
      .where({ user_id: userId })
      .first()

    if (!row) {
      throw new NotFoundError('Account does not exist for given user-id')
    }

    return this.transform(row)
  }

  public async findByUser(
    limit: number,
    offset: number
  ): Promise<Accounts[]> {
    const conn = await this.db.getConnection()
    const results = await conn
      .select()
      .from(this.TABLE)
      // .where({ user_id: userId })
      .orderBy('updated', 'DESC')
      .offset(offset)
      .limit(limit)

    return results.map((r: any) => this.transform(r))
  }

  public async insert(account: Accounts): Promise<Accounts> {
    account.created = new Date()
    account.updated = new Date()

    const conn = await this.db.getConnection()

    const checkEntry = await conn
      .select()
      .from(this.TABLE)
      .where({ user_id: account.userId })
    if(!_.isEmpty(checkEntry)){
      console.log(checkEntry)
      throw new ValidationError('Already account exitst for given user=id');
    }

    const row = await conn
      .select()
      .from(this.USER_TABLE)
      .where({ id: account.userId })
    
    let insertData = false;
    if(row){
      const userData = row[0];
      let monthlySalary = userData.monthly_salary;
      let monthlyExpense = userData.monthly_expense;
      if((monthlySalary-monthlyExpense)>=1000)
        insertData = true;
    }
    
    if(insertData){
    const result = await conn.table(this.TABLE).insert({
      accountType: account.accountType,
      creditAmount: account.creditAmount,
      isApproved: account.isApproved,
      created: account.created,
      updated: account.updated,
      user_id: account.userId
    })

    account.id = result[0]
    }
    else{
      throw new UserUnauthorizedError('User not allowed to create account')
    }
    return account
  }

  public async update(account: Accounts): Promise<Accounts> {
    account.updated = new Date()

    const conn = await this.db.getConnection()

    await conn
      .table(this.TABLE)
      .update({
        accountType: account.accountType,
        creditAmount: account.creditAmount,
        isApproved: account.isApproved
      })
      .where({ user_id: account.userId, id: account.id })

    return account
  }

  public async delete(userId: number, accountId: number): Promise<void> {
    const conn = await this.db.getConnection()

    const result = await conn
      .from(this.TABLE)
      .delete()
      .where({ id: accountId, user_id: userId })

    if (result === 0) {
      throw new NotFoundError('Accounts does not exist')
    }
  }

  private transform(row: any): Accounts {
    return {
      id: row.id,
      accountType: row.accountType,
      creditAmount: row.creditAmount,
      userId: row.user_id,
      isApproved: row.isApproved === 1,
      created: row.created,
      updated: row.updated
    }
  }
}
