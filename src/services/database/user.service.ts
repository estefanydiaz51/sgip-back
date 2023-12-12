import UserSchema, { type IUser, type UserDocument } from '../../models/User'
import {
  type UpdateQuery,
  type FilterQuery,
  type ProjectionType,
  type QueryOptions
} from 'mongoose'
import { compare } from 'bcrypt'

interface IUserService {
  create: (create: IUser) => Promise<UserDocument>
  findOneUser: (
    query: FilterQuery<UserDocument>,
    projection?: ProjectionType<UserDocument>,
    options?: QueryOptions<UserDocument>
  ) => Promise<UserDocument | null>
  findByIdAndUpdateUser: (
    query: FilterQuery<UserDocument>,
    update: UpdateQuery<UserDocument>,
    options?: QueryOptions<UserDocument>
  ) => Promise<UserDocument | null>
  findUser: (
    query: FilterQuery<UserDocument>,
    projection?: ProjectionType<UserDocument>,
    options?: QueryOptions<UserDocument>
  ) => Promise<UserDocument[] | null>
  findByIdUser: (
    id: FilterQuery<UserDocument> | string,
    projection?: ProjectionType<UserDocument>,
    options?: QueryOptions<UserDocument>
  ) => Promise<UserDocument | null>
  matchPassword: (password: string, hash: string) => Promise<boolean>
}

class User implements IUserService {
  async create(create: IUser): Promise<UserDocument> {
    const created = new UserSchema(create)
    created.password = await created.encryptPassword(create.password)
    return created.save()
  }

  async findOneUser(
    user: FilterQuery<UserDocument> = {},
    projection: ProjectionType<UserDocument> = {},
    options: QueryOptions<UserDocument> = {}
  ): Promise<UserDocument | null> {
    return await UserSchema.findOne(user, projection, options).exec()
  }

  async findByIdAndUpdateUser(
    user: FilterQuery<UserDocument> = {},
    update: UpdateQuery<UserDocument> = {},
    options: QueryOptions<UserDocument> = {}
  ): Promise<UserDocument | null> {
    return await UserSchema.findByIdAndUpdate(user, update, options).exec()
  }

  async findUser(
    user: FilterQuery<UserDocument> = {},
    projection: ProjectionType<UserDocument> = {},
    options: QueryOptions<UserDocument> = {}
  ): Promise<UserDocument[] | null> {
    return await UserSchema.find(user, projection, options).exec()
  }

  async findByIdUser(
    user: FilterQuery<UserDocument> | string = {},
    projection: ProjectionType<UserDocument> = {},
    options: QueryOptions<UserDocument> = {}
  ): Promise<UserDocument | null> {
    return await UserSchema.findById(user, projection, options).exec()
  }

  async matchPassword(password: string, hash: string): Promise<boolean> {
    const comparing = await compare(password, hash)
    return comparing
  }
}

export const UserService: IUserService = new User()
