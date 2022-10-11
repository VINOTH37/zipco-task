import * as Joi from 'joi'

export const updateAccount: Joi.SchemaMap = {
  accountType: Joi.string().required(),
  creditAmount: Joi.string().required(),
  isApproved: Joi.boolean().required()
}

export const createAccount: Joi.SchemaMap = {
  accountType: Joi.string().required(),
  creditAmount: Joi.string().required()
}
