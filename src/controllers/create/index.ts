import { auth } from '../../middlewares/auth'
import routerx from 'express-promise-router'
import {
  CreateStudents,
  CreateProgram,
  CreateCohort,
  CreateTeacher,
  CreateCoordinator
} from './controller'

const createRouter = routerx()

createRouter.post('/students', auth('create-students'), CreateStudents)
createRouter.post('/program', auth('create-program'), CreateProgram)
createRouter.post('/cohort', auth('create-cohort'), CreateCohort)
createRouter.post('/teacher', auth('create-teacher'), CreateTeacher)
createRouter.post('/coordinator', auth('create-coordinator'), CreateCoordinator)

export { createRouter }
