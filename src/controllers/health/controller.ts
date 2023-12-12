import { type Request, type Response } from 'express'
import { NODE_ENV } from '../../config'
import { errorSender } from '../../helpers/errorSender'
import packageJson from '../../../package.json'

const Health = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.send({
      uptime: process.uptime(),
      message: 'Ok',
      environment: NODE_ENV,
      version: packageJson.version,
      date: new Date().toISOString()
    })
  } catch (error) {
    return errorSender('/health', error, res, req)
  }
}
export { Health }
