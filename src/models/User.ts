import { Schema, type Document, model } from 'mongoose'
import { genSalt, hash as _hash } from 'bcrypt'
import { type IProgram } from './Program'

export interface IUser {
  name: string
  surname: string
  password: string
  role?: string
  email: string
  programs?: IProgram[]
  createdAt?: Date
}

interface IUserMethods {
  encryptPassword: (password: string) => Promise<string>
}

export type UserDocument = Document & IUser & IUserMethods

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'administrador' },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  programs: [{ type: Schema.ObjectId, ref: 'Programs' }]
})

UserSchema.methods.encryptPassword = async function (
  password: string
): Promise<string> {
  const salt = await genSalt(10)
  return _hash(password, salt)
}

export default model<UserDocument>('Users', UserSchema)
