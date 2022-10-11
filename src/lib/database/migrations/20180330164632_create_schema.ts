import * as knex from 'knex'

export function up(db: knex) {
  return db.schema
    .createTable('user', table => {
      table.increments('id').primary()
      table.string('email', 64).unique()
      table.string('first_name', 64).notNullable()
      table.string('last_name', 64).notNullable()
      table.integer('monthly_expense').notNullable()
      table.integer('monthly_salary').notNullable()
      table.dateTime('created').notNullable()
      table.dateTime('updated').notNullable()
    })
    .then(() => {
      return db.schema.createTable('account', table => {
        table.increments('id').primary()
        table.string('accountType', 64).notNullable()
        table.string('creditAmount').notNullable()
        table.boolean('isApproved').notNullable()
        table.dateTime('created').notNullable()
        table.dateTime('updated').notNullable()
        table
          .integer('user_id')
          .notNullable()
          .unsigned()
          .references('id')
          .inTable('user')
      })
    })
}

export function down(db: knex) {
  return db.schema.dropTable('account').dropTable('user')
}
