import routerx from 'express-promise-router'
import { Health } from './controller'

const healthRouter = routerx()

healthRouter
  .get('/', Health)
  .get('/health', Health)

export { healthRouter }
