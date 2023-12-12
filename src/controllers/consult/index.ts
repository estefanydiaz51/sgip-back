import { auth } from '../../middlewares/auth'
import routerx from 'express-promise-router'
import {
  ConsultCohorts,
  ConsultCoordinators,
  ConsultPrograms,
  ConsultStudents,
  ConsultTeachers
} from './controller'

const consultRouter = routerx()

consultRouter.get('/students', auth('consult-students'), ConsultStudents)
consultRouter.get('/cohorts', auth('consult-students'), ConsultCohorts)
consultRouter.get('/programs', auth('consult-students'), ConsultPrograms)
consultRouter.get('/teachers', auth('consult-students'), ConsultTeachers)
consultRouter.get(
  '/coordinators',
  auth('consult-coordinators'),
  ConsultCoordinators
)

export { consultRouter }
