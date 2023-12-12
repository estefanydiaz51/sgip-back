import routerx from 'express-promise-router'
import {
  userRouter,
  authRouter,
  healthRouter,
  createRouter,
  consultRouter,
  updateRouter
} from './controllers'

const router = routerx()

router.use('/', healthRouter)
router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/create', createRouter)
router.use('/consult', consultRouter)
router.use('/update', updateRouter)

export default router
