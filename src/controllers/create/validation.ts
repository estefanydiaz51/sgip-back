import Joi from 'joi'

class CreateValidator {
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
    email: Joi.string().trim().email().required(),
    cohortId: Joi.string().hex().length(24).required()
  })

  static program: Joi.ObjectSchema<any> = Joi.object().keys({
    name: Joi.string().trim().required(),
    id: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    logo: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    researchLines: Joi.string().trim().required(),
    dateRegistration: Joi.string().trim().required(),
    numberResolutionOfQualifiedRegistration: Joi.string().trim().required(),
    resolutionFile: Joi.string().trim().required()
  })

  static cohort: Joi.ObjectSchema<any> = Joi.object().keys({
    name: Joi.string().trim().required(),
    code: Joi.string().trim().required(),
    startDate: Joi.string().trim().required(),
    EndDate: Joi.string().trim().required(),
    numberStudents: Joi.string().trim().required()
  })

  static teacher: Joi.ObjectSchema<any> = Joi.object().keys({
    name: Joi.string().trim().required(),
    idCard: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    phone: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    gender: Joi.string().trim().required(),
    birthDay: Joi.string().trim().required(),
    academicTraining: Joi.string().trim().required(),
    knowledgeAreas: Joi.array().items(Joi.string().required())
  })

  static coordinator: Joi.ObjectSchema<any> = Joi.object().keys({
    name: Joi.string().trim().min(3).max(12).required(),
    programId: Joi.string().hex().length(24).required(),
    surname: Joi.string().trim().min(3).max(35).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(8).max(35).required()
  })
}

export default CreateValidator
