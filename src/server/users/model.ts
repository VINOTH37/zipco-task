import { User } from '../../entities'

export interface CreateUser {
  email: string
  firstName: string
  lastName: string
  monthlySalary: number
  monthlyExpense: number
}

export class UserModel {
  public id: number
  public email: string
  public firstName: string
  public lastName: string
  public monthlySalary: number
  public monthlyExpense: number
  public created: Date
  public updated: Date

  constructor(user: User) {
    this.id = user.id
    this.email = user.email
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.monthlySalary = user.monthlySalary
    this.monthlyExpense = user.monthlyExpense
    this.created = user.created
    this.updated = user.updated
  }
}
