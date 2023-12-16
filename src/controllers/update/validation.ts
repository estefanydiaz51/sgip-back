import Joi from 'joi'

class UpdateValidator {
  static student: Joi.ObjectSchema<any> = Joi.object()
    .keys({
      programId: Joi.string().hex().length(24),
      studentId: Joi.string().hex().length(24).required(),
      cohortId: Joi.string().hex().length(24),
      name: Joi.string().trim(),
      id: Joi.string().trim(),
      studentCode: Joi.string().trim(),
      photo: Joi.string().trim(),
      address: Joi.string().trim(),
      phone: Joi.string().trim(),
      gender: Joi.string().trim(),
      birthDay: Joi.string().trim(),
      semester: Joi.string().trim(),
      civilStatus: Joi.string().trim(),
      ingressDate: Joi.string().trim(),
      egressDate: Joi.string().trim(),
      email: Joi.string().trim().email()
    })
    .or(
      'programId',
      'cohortId',
      'name',
      'id',
      'studentCode',
      'photo',
      'address',
      'phone',
      'gender',
      'birthDay',
      'semester',
      'civilStatus',
      'ingressDate',
      'egressDate',
      'email'
    )

  static cohort: Joi.ObjectSchema<any> = Joi.object()
    .keys({
      cohortId: Joi.string().hex().length(24).required(),
      name: Joi.string().trim(),
      code: Joi.string().trim(),
      startDate: Joi.string().trim(),
      EndDate: Joi.string().trim(),
      numberStudents: Joi.string().trim(),
      teachers: Joi.array().items(Joi.string().hex().length(24)).required()
    })
    .or('name', 'code', 'startDate', 'EndDate', 'numberStudents', 'teachers')

  static program: Joi.ObjectSchema<any> = Joi.object()
    .keys({
      programId: Joi.string().hex().length(24).required(),
      cohortId: Joi.array().items(Joi.string().hex().length(24)).required(),
      name: Joi.string().trim(),
      id: Joi.string().trim(),
      description: Joi.string().trim(),
      logo: Joi.string().trim(),
      email: Joi.string().trim(),
      researchLines: Joi.string().trim(),
      dateRegistration: Joi.string().trim(),
      numberResolutionOfQualifiedRegistration: Joi.string().trim(),
      resolutionFile: Joi.string().trim()
    })
    .or(
      'name',
      'id',
      'description',
      'logo',
      'email',
      'researchLines',
      'dateRegistration',
      'numberResolutionOfQualifiedRegistration',
      'resolutionFile',
      'cohortId'
    )

  static teacher: Joi.ObjectSchema<any> = Joi.object()
    .keys({
      teacherId: Joi.string().hex().length(24).required(),
      name: Joi.string().trim(),
      idCard: Joi.string().trim(),
      address: Joi.string().trim(),
      phone: Joi.string().trim(),
      email: Joi.string().trim(),
      gender: Joi.string().trim(),
      birthDay: Joi.string().trim(),
      academicTraining: Joi.string().trim(),
      knowledgeAreas: Joi.array().items(Joi.string().required())
    })
    .or(
      'name',
      'idCard',
      'address',
      'phone',
      'email',
      'gender',
      'birthDay',
      'academicTraining',
      'knowledgeAreas'
    )

  static coordinator: Joi.ObjectSchema<any> = Joi.object()
    .keys({
      coordinatorId: Joi.string().hex().length(24).required(),
      name: Joi.string().trim().min(3).max(12),
      programId: Joi.string().hex().length(24),
      surname: Joi.string().trim().min(3).max(35),
      email: Joi.string().trim().email(),
      password: Joi.string().trim().min(8).max(35)
    })
    .or('name', 'surname', 'email', 'password', 'programId')
}

export default UpdateValidator
