import TeacherSchema, {
  type ITeacher,
  type TeacherDocument
} from '../../models/Teacher'
import {
  type UpdateQuery,
  type FilterQuery,
  type ProjectionType,
  type QueryOptions
} from 'mongoose'

interface ITeacherService {
  create: (create: ITeacher) => Promise<TeacherDocument>
  findOneTeacher: (
    query: FilterQuery<TeacherDocument>,
    projection?: ProjectionType<TeacherDocument>,
    options?: QueryOptions<TeacherDocument>
  ) => Promise<TeacherDocument | null>
  findByIdAndUpdateTeacher: (
    query: FilterQuery<TeacherDocument>,
    update: UpdateQuery<TeacherDocument>,
    options?: QueryOptions<TeacherDocument>
  ) => Promise<TeacherDocument | null>
  findTeacher: (
    query: FilterQuery<TeacherDocument>,
    projection?: ProjectionType<TeacherDocument>,
    options?: QueryOptions<TeacherDocument>
  ) => Promise<TeacherDocument[] | null>
  findByIdTeacher: (
    id: FilterQuery<TeacherDocument> | string,
    projection?: ProjectionType<TeacherDocument>,
    options?: QueryOptions<TeacherDocument>
  ) => Promise<TeacherDocument | null>
}

class Teacher implements ITeacherService {
  async create(create: ITeacher): Promise<TeacherDocument> {
    const created = new TeacherSchema(create)
    return created.save()
  }

  async findOneTeacher(
    teacher: FilterQuery<TeacherDocument> = {},
    projection: ProjectionType<TeacherDocument> = {},
    options: QueryOptions<TeacherDocument> = {}
  ): Promise<TeacherDocument | null> {
    return await TeacherSchema.findOne(teacher, projection, options).exec()
  }

  async findByIdAndUpdateTeacher(
    teacher: FilterQuery<TeacherDocument> = {},
    update: UpdateQuery<TeacherDocument> = {},
    options: QueryOptions<TeacherDocument> = {}
  ): Promise<TeacherDocument | null> {
    return await TeacherSchema.findByIdAndUpdate(
      teacher,
      update,
      options
    ).exec()
  }

  async findTeacher(
    teacher: FilterQuery<TeacherDocument> = {},
    projection: ProjectionType<TeacherDocument> = {},
    options: QueryOptions<TeacherDocument> = {}
  ): Promise<TeacherDocument[] | null> {
    return await TeacherSchema.find(teacher, projection, options).exec()
  }

  async findByIdTeacher(
    teacher: FilterQuery<TeacherDocument> | string = {},
    projection: ProjectionType<TeacherDocument> = {},
    options: QueryOptions<TeacherDocument> = {}
  ): Promise<TeacherDocument | null> {
    return await TeacherSchema.findById(teacher, projection, options).exec()
  }
}

export const TeacherService: ITeacherService = new Teacher()
