import routerx from 'express-promise-router'
import { Login, Register } from './controller'

const authRouter = routerx()

authRouter.post('/login', Login)
authRouter.post('/register', Register)

export { authRouter }
