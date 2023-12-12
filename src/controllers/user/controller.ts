import { type Request, type Response } from 'express'
import { errorSender } from '../../helpers/errorSender'

const GetProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.send(req.user)
  } catch (error) {
    return errorSender('/user/profile', error, res, req)
  }
}
export { GetProfile }
