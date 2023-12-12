import { type Request, type Response, type NextFunction } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import { UserService } from '../services'
import { RoleService } from '../services/database/role.service'

export const auth = (
  permission?: string
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.headers.token ?? ''
    if (token && typeof token === 'string') {
      try {
        const decoded = jwt.verify(token, JWT_SECRET)

        if (typeof decoded !== 'string') {
          const payload = decoded as JwtPayload & { id: string }

          const user = await UserService.findByIdUser(payload.id, {
            __v: 0,
            password: 0,
            date: 0
          })

          if (user) {
            if (!permission) {
              req.user = {
                ...JSON.parse(JSON.stringify(user))
              }
              next()
              return
            }

            const role = await RoleService.findOneRole({ name: user.role })

            if (
              role &&
              (role.permissions.includes(permission) ||
                role.permissions.includes('*'))
            ) {
              req.user = {
                ...JSON.parse(JSON.stringify(user)),
                permissions: role.permissions
              }
            } else {
              res.status(401).json({ message: 'Role no válido' })
              return
            }
          } else {
            res.status(401).json({ message: 'usuario no existe' })
            return
          }
        }

        next()
      } catch (error) {
        console.log(error)

        res.status(401).json({ message: 'Token no válido' })
      }
    } else {
      res
        .status(401)
        .json({ message: 'No se ha proporcionado un token de autenticación' })
    }
  }
}
