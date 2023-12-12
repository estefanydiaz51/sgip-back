import { type Request, type Response } from 'express'
import { errorSender } from '../../helpers/errorSender'
import { StudentService } from '../../services/database/student.service'
import { CohortService } from '../../services/database/cohort.service'
import { ProgramService } from '../../services/database/program.service'
import { TeacherService } from '../../services/database/teacher.service'
import { UserService } from '../../services'

const ConsultStudents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { role, programs } = req.user
    if (role === 'administrador') {
      const findStudent = await StudentService.findStudent({})
      return res.send(findStudent)
    }
    const findStudent = await StudentService.findStudent({
      programs: { $in: programs[0] }
    })

    return res.send(findStudent)
  } catch (error) {
    return errorSender('/consult/students', error, res, req)
  }
}

const ConsultCohorts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { role, programs } = req.user
    if (role === 'administrador') {
      const findCohort = await CohortService.findCohort({})
      return res.send(findCohort)
    }
    const findCohort = await ProgramService.findByIdProgram(
      programs[0],
      {},
      {},
      [{ path: 'cohorts' }]
    )

    return res.send(findCohort?.cohorts)
  } catch (error) {
    return errorSender('/consult/cohorts', error, res, req)
  }
}

const ConsultPrograms = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { role, programs } = req.user
    console.log(programs)

    if (role === 'administrador') {
      const findProgram = await ProgramService.findProgram({})
      return res.send(findProgram)
    }
    const findProgram = await ProgramService.findByIdProgram(programs[0])
    console.log(findProgram)

    return res.send(findProgram)
  } catch (error) {
    return errorSender('/consult/programs', error, res, req)
  }
}

const ConsultTeachers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { role, programs } = req.user
    if (role === 'administrador') {
      const findTeacher = await TeacherService.findTeacher({})
      return res.send(findTeacher)
    }
    const findTeacher = await ProgramService.findByIdProgram(
      programs[0],
      {},
      {},
      [{ path: 'teachers' }]
    )

    return res.send(findTeacher?.teachers)
  } catch (error) {
    return errorSender('/consult/teachers', error, res, req)
  }
}

const ConsultCoordinators = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { role, _id } = req.user
    if (role === 'administrador') {
      const findCoordinators = await UserService.findUser({ _id: { $ne: _id } })
      return res.send(findCoordinators)
    }

    return res.send(req.user)
  } catch (error) {
    return errorSender('/consult/coordinators', error, res, req)
  }
}

export {
  ConsultStudents,
  ConsultCohorts,
  ConsultPrograms,
  ConsultTeachers,
  ConsultCoordinators
}
