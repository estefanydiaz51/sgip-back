import { type Request, type Response } from 'express'
import { errorSender } from '../../helpers/errorSender'
import { StudentService } from '../../services/database/student.service'
import { CohortService } from '../../services/database/cohort.service'
import { ProgramService } from '../../services/database/program.service'
import { TeacherService } from '../../services/database/teacher.service'
import joiValidate from '../../libs/joiValidate'
import UpdateValidator from './validation'
import { UserService } from '../../services'

const UpdateStudent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await joiValidate({
      body: req.body,
      schema: UpdateValidator.student
    })

    const {
      programId,
      studentId,
      cohortId,
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
      email
    } = req.body

    const updateStudent = await StudentService.findByIdAndUpdateStudent(
      studentId,
      {
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
        $addToSet: {
          programs: programId,
          cohorts: cohortId
        }
      },
      { new: true }
    )

    return res.send(updateStudent)
  } catch (error) {
    return errorSender('/update/student', error, res, req)
  }
}

const UpdateCohort = async (req: Request, res: Response): Promise<Response> => {
  try {
    await joiValidate({
      body: req.body,
      schema: UpdateValidator.cohort
    })

    const {
      name,
      code,
      startDate,
      EndDate,
      numberStudents,
      cohortId,
      teachers
    } = req.body

    const updateCohort = await CohortService.findByIdAndUpdateCohort(
      cohortId,
      {
        name,
        code,
        startDate,
        EndDate,
        numberStudents,
        $addToSet: {
          teachers
        }
      },
      { new: true }
    )

    return res.send(updateCohort)
  } catch (error) {
    return errorSender('/update/cohort', error, res, req)
  }
}

const UpdateProgram = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await joiValidate({
      body: req.body,
      schema: UpdateValidator.program
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
      resolutionFile,
      programId,
      cohortId
    } = req.body
    const UpdateProgram = await ProgramService.findByIdAndUpdateProgram(
      programId,
      {
        name,
        id,
        description,
        logo,
        email,
        researchLines,
        dateRegistration,
        numberResolutionOfQualifiedRegistration,
        resolutionFile,
        $addToSet: {
          cohorts: cohortId
        }
      },
      { new: true }
    )

    return res.send(UpdateProgram)
  } catch (error) {
    return errorSender('/update/program', error, res, req)
  }
}

const UpdateTeacher = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await joiValidate({
      body: req.body,
      schema: UpdateValidator.teacher
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
      knowledgeAreas,
      teacherId
    } = req.body

    const updateTeacher = await TeacherService.findByIdAndUpdateTeacher(
      teacherId,
      {
        name,
        idCard,
        address,
        phone,
        email,
        gender,
        birthDay,
        academicTraining,
        knowledgeAreas
      },
      { new: true }
    )

    return res.send(updateTeacher)
  } catch (error) {
    return errorSender('/update/teacher', error, res, req)
  }
}

const UpdateCoordinator = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await joiValidate({
      body: req.body,
      schema: UpdateValidator.coordinator
    })

    const { name, surname, password, email, programId, coordinatorId } =
      req.body

    const updateCoordinator = await UserService.findByIdAndUpdateUser(
      coordinatorId,
      {
        name,
        surname,
        password,
        email,
        programs: [programId]
      },
      { new: true }
    )

    return res.send(updateCoordinator)
  } catch (error) {
    return errorSender('/update/coordinator', error, res, req)
  }
}

export {
  UpdateStudent,
  UpdateCohort,
  UpdateProgram,
  UpdateTeacher,
  UpdateCoordinator
}
