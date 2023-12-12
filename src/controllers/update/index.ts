import { auth } from '../../middlewares/auth'
import routerx from 'express-promise-router'
import {
  UpdateStudent,
  UpdateCohort,
  UpdateProgram,
  UpdateTeacher,
  UpdateCoordinator
} from './controller'

const updateRouter = routerx()

updateRouter.post('/student', auth('update-student'), UpdateStudent)
updateRouter.post('/cohort', auth('update-cohort'), UpdateCohort)
updateRouter.post('/program', auth('update-program'), UpdateProgram)
updateRouter.post('/teacher', auth('update-teacher'), UpdateTeacher)
updateRouter.post('/coordinator', auth('update-coordinator'), UpdateCoordinator)

export { updateRouter }
