import StudentSchema, {
  type IStudent,
  type StudentDocument
} from '../../models/Student'
import {
  type UpdateQuery,
  type FilterQuery,
  type ProjectionType,
  type QueryOptions
} from 'mongoose'

interface IStudentService {
  create: (create: IStudent) => Promise<StudentDocument>
  findOneStudent: (
    query: FilterQuery<StudentDocument>,
    projection?: ProjectionType<StudentDocument>,
    options?: QueryOptions<StudentDocument>
  ) => Promise<StudentDocument | null>
  findByIdAndUpdateStudent: (
    query: FilterQuery<StudentDocument>,
    update: UpdateQuery<StudentDocument>,
    options?: QueryOptions<StudentDocument>
  ) => Promise<StudentDocument | null>
  findStudent: (
    query: FilterQuery<StudentDocument>,
    projection?: ProjectionType<StudentDocument>,
    options?: QueryOptions<StudentDocument>
  ) => Promise<StudentDocument[] | null>
  findByIdStudent: (
    id: FilterQuery<StudentDocument> | string,
    projection?: ProjectionType<StudentDocument>,
    options?: QueryOptions<StudentDocument>
  ) => Promise<StudentDocument | null>
}

class Student implements IStudentService {
  async create(create: IStudent): Promise<StudentDocument> {
    const created = new StudentSchema(create)
    return created.save()
  }

  async findOneStudent(
    student: FilterQuery<StudentDocument> = {},
    projection: ProjectionType<StudentDocument> = {},
    options: QueryOptions<StudentDocument> = {}
  ): Promise<StudentDocument | null> {
    return await StudentSchema.findOne(student, projection, options).exec()
  }

  async findByIdAndUpdateStudent(
    student: FilterQuery<StudentDocument> = {},
    update: UpdateQuery<StudentDocument> = {},
    options: QueryOptions<StudentDocument> = {}
  ): Promise<StudentDocument | null> {
    return await StudentSchema.findByIdAndUpdate(
      student,
      update,
      options
    ).exec()
  }

  async findStudent(
    student: FilterQuery<StudentDocument> = {},
    projection: ProjectionType<StudentDocument> = {},
    options: QueryOptions<StudentDocument> = {}
  ): Promise<StudentDocument[] | null> {
    return await StudentSchema.find(student, projection, options).exec()
  }

  async findByIdStudent(
    student: FilterQuery<StudentDocument> | string = {},
    projection: ProjectionType<StudentDocument> = {},
    options: QueryOptions<StudentDocument> = {}
  ): Promise<StudentDocument | null> {
    return await StudentSchema.findById(student, projection, options).exec()
  }
}

export const StudentService: IStudentService = new Student()
