import { auth } from './../../middlewares/auth'
import routerx from 'express-promise-router'
import { GetProfile } from './controller'

const userRouter = routerx()

userRouter.get('/profile', auth(), GetProfile)

export { userRouter }
