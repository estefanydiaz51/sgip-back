import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config'
import joiValidate from '../../libs/joiValidate'
import AuthValidator from './validation'
import { UserService } from '../../services'
import httpStatus from 'http-status-codes'
import { errorSender } from '../../helpers/errorSender'

const Login = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log(req.body)

    await joiValidate({
      body: req.body,
      schema: AuthValidator.login
    })
    const { email, password } = req.body
    const user = await UserService.findOneUser({ email })
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'usuario no encontrado'
      })
    }
    const matchpass = await UserService.matchPassword(password, user.password)
    if (!matchpass) {
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        message: 'contraseña incorrecta'
      })
    }

    const jwtToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '30d'
    })

    return res.json({ user, token: jwtToken })
  } catch (error) {
    return errorSender('/auth/login', error, res, req)
  }
}

const Register = async (req: Request, res: Response): Promise<Response> => {
  try {
    await joiValidate({
      body: req.body,
      schema: AuthValidator.register
    })
    const { name, surname, password, email } = req.body

    const existingEmail = await UserService.findOneUser({ email })
    if (existingEmail) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'correo existe'
      })
    }

    const newUser = await UserService.create({
      name,
      password,
      email,
      role: 'administrador',
      surname
    })
    newUser.password = await newUser.encryptPassword(password)

    const jwtToken = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: '30d'
    })

    return res
      .status(httpStatus.OK)
      .json({ message: 'Registro exitoso', token: jwtToken })
  } catch (error) {
    return errorSender('/auth/register', error, res, req)
  }
}

export { Login, Register }
