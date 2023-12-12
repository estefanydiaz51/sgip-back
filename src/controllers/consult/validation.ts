import Joi from 'joi'

class ConsultValidator {
  static students: Joi.ObjectSchema<any> = Joi.object().keys({
    name: Joi.string().trim().required(),
    id: Joi.string().trim().required(),
    studentCode: Joi.string().trim().required(),
    photo: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    phone: Joi.string().trim().required(),
    gender: Joi.string().trim().required(),
    birthDay: Joi.string().trim().required(),
    semester: Joi.string().trim().required(),
    civilStatus: Joi.string().trim().required(),
    ingressDate: Joi.string().trim().required(),
    egressDate: Joi.string().trim().required(),
    cohort: Joi.string().trim().required(),
    email: Joi.string().trim().email().required()
  })
}

export default ConsultValidator
