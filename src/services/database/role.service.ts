import {
  type FilterQuery,
  type ProjectionType,
  type QueryOptions
} from 'mongoose'
import RoleSchema, { type IRoles } from '../../models/Roles'

interface IRoleService {
  create: (create: IRoles) => Promise<IRoles>
  findOneRole: (
    query: FilterQuery<IRoles>,
    projection?: ProjectionType<IRoles>,
    options?: QueryOptions<IRoles>
  ) => Promise<IRoles | null>
  findRole: (
    query: FilterQuery<IRoles>,
    projection?: ProjectionType<IRoles>,
    options?: QueryOptions<IRoles>
  ) => Promise<IRoles[] | null>
}

class Role implements IRoleService {
  async create(create: IRoles): Promise<IRoles> {
    const created = new RoleSchema(create)
    return created.save()
  }

  async findOneRole(
    user: FilterQuery<IRoles> = {},
    projection: ProjectionType<IRoles> = {},
    options: QueryOptions<IRoles> = {}
  ): Promise<IRoles | null> {
    return await RoleSchema.findOne(user, projection, options).exec()
  }

  async findRole(
    user: FilterQuery<IRoles> = {},
    projection: ProjectionType<IRoles> = {},
    options: QueryOptions<IRoles> = {}
  ): Promise<IRoles[] | null> {
    return await RoleSchema.find(user, projection, options).exec()
  }
}

export const RoleService: IRoleService = new Role()
