import { ValidationError } from './customErrors'
import { type Request, type Response } from 'express'
import httpStatus from 'http-status-codes'

export const errorSender = (
  route: string,
  error: unknown | Error,
  res: Response,
  req: Request
): Response => {
  if (error instanceof ValidationError) {
    return res.status(httpStatus.BAD_REQUEST).send(error)
  }

  console.log(route, error)
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'internal error'
  })
}
