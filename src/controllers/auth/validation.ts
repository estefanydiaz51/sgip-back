import Joi from 'joi'

class AuthValidator {
  static login: Joi.ObjectSchema<any> =
    Joi.object().keys({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(8).max(35).required()
    })

  static register: Joi.ObjectSchema<any> =
    Joi.object().keys({
      name: Joi.string().trim().min(3).max(12).required(),
      surname: Joi.string().trim().min(3).max(35).required(),
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(8).max(35).required()
    })
}

export default AuthValidator
