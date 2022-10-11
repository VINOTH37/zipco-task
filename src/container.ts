import { Logger } from 'pino'
import { Authenticator, JWTAuthenticator } from './lib/authentication'
import { MySql } from './lib/database'
import { BCryptHasher, Hasher } from './lib/hasher'
import { HealthMonitor } from './lib/health'
import { AccountManager, UserManager } from './managers'
import { AccountRepository, UserRepository } from './repositories'

export interface ServiceContainer {
  health: HealthMonitor
  logger: Logger
  lib: {
    hasher: Hasher
    authenticator: Authenticator
  }
  repositories: {
    account: AccountRepository
    user: UserRepository
  }
  managers: {
    account: AccountManager
    user: UserManager
  }
}

export function createContainer(db: MySql, logger: Logger): ServiceContainer {
  const accountRepo = new AccountRepository(db)
  const userRepo = new UserRepository(db)
  const hasher = new BCryptHasher()
  const authenticator = new JWTAuthenticator(userRepo)
  const healthMonitor = new HealthMonitor()

  return {
    health: healthMonitor,
    logger,
    lib: {
      hasher,
      authenticator
    },
    repositories: {
      account: accountRepo,
      user: userRepo
    },
    managers: {
      account: new AccountManager(accountRepo),
      user: new UserManager(userRepo)
    }
  }
}
