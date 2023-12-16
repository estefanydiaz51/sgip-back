import { type Request, type Response } from 'express'
import { errorSender } from '../../helpers/errorSender'
import joiValidate from '../../libs/joiValidate'
import CreateValidator from './validation'
import { ProgramService } from '../../services/database/program.service'
import { CohortService } from '../../services/database/cohort.service'
import { TeacherService } from '../../services/database/teacher.service'
import { UserService } from '../../services'
import httpStatus from 'http-status-codes'
import User from '../../models/User'
import Student from '../../models/Student'

const CreateStudents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await joiValidate({
      body: req.body,
      schema: CreateValidator.students
    })
    const {
      name,
      id,
      studentCode,
      photo,
      address,
      phone,
      gender,
      birthDay,
      semester,
      civilStatus,
      ingressDate,
      egressDate,
      email,
      cohortId
    } = req.body
    const findCohort = await CohortService.findByIdCohort(cohortId)
    if (!findCohort) {
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        message: 'corte no encontrada'
      })
    }
    console.log(findCohort)

    const newStudent = new Student({
      name,
      id,
      studentCode,
      photo,
      address,
      phone,
      gender,
      birthDay,
      semester,
      civilStatus,
      ingressDate,
      egressDate,
      email,
      cohort: findCohort
    })

    await newStudent.save()
    return res.send(newStudent)
  } catch (error) {
    return errorSender('/create/students', error, res, req)
  }
}

const CreateProgram = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await joiValidate({
      body: req.body,
      schema: CreateValidator.program
    })

    const {
      name,
      id,
      description,
      logo,
      email,
      researchLines,
      dateRegistration,
      numberResolutionOfQualifiedRegistration,
      resolutionFile
    } = req.body

    const createProgram = await ProgramService.create({
      name,
      id,
      description,
      logo,
      email,
      researchLines,
      dateRegistration,
      numberResolutionOfQualifiedRegistration,
      resolutionFile
    })

    return res.send(createProgram)
  } catch (error) {
    return errorSender('/create/program', error, res, req)
  }
}

const CreateCohort = async (req: Request, res: Response): Promise<Response> => {
  try {
    await joiValidate({
      body: req.body,
      schema: CreateValidator.cohort
    })

    const { name, code, startDate, EndDate, numberStudents } = req.body

    const createCohort = await CohortService.create({
      name,
      code,
      startDate,
      EndDate,
      numberStudents
    })

    return res.send(createCohort)
  } catch (error) {
    return errorSender('/create/cohort', error, res, req)
  }
}

const CreateTeacher = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await joiValidate({
      body: req.body,
      schema: CreateValidator.teacher
    })

    const {
      name,
      idCard,
      address,
      phone,
      email,
      gender,
      birthDay,
      academicTraining,
      knowledgeAreas
    } = req.body

    const createTeacher = await TeacherService.create({
      name,
      idCard,
      address,
      phone,
      email,
      gender,
      birthDay,
      academicTraining,
      knowledgeAreas
    })

    return res.send(createTeacher)
  } catch (error) {
    return errorSender('/create/teacher', error, res, req)
  }
}

const CreateCoordinator = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await joiValidate({
      body: req.body,
      schema: CreateValidator.coordinator
    })
    const { name, surname, password, email, programId } = req.body

    const existingEmail = await UserService.findOneUser({ email })
    if (existingEmail) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'correo existe'
      })
    }
    const existingProgram = await ProgramService.findByIdProgram(programId)

    if (!existingProgram) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'programa no existe'
      })
    }
    const newUser = new User({
      name,
      surname,
      password,
      email,
      role: 'coordinador'
    })
    newUser.programs?.push(existingProgram._id)
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save()

    return res.send(newUser)
  } catch (error) {
    return errorSender('/create/coordinator', error, res, req)
  }
}

export {
  CreateStudents,
  CreateProgram,
  CreateCohort,
  CreateTeacher,
  CreateCoordinator
}
