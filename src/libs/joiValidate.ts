import { ValidationError } from '../helpers/customErrors'
import { type ObjectSchema } from 'joi'

interface JoiValidate {
  body: any
  schema: ObjectSchema<any>
}

const joiValidate = async ({ body, schema }: JoiValidate): Promise<any> => {
  const { error } = schema.validate(body, {
    allowUnknown: false,
    abortEarly: true,
    convert: true
  })

  if (error !== undefined) {
    console.log(error.details[0])
    throw new ValidationError({
      code: 400,
      message: error.details[0].message,
      label: `${error.details[0].path[0]}`,
      details: error.details[0].message
    })
  }
}

export default joiValidate
