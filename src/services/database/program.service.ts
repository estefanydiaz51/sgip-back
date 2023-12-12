import ProgramSchema, {
  type IProgram,
  type ProgramDocument
} from '../../models/Program'
import {
  type UpdateQuery,
  type FilterQuery,
  type ProjectionType,
  type QueryOptions,
  type PopulateOptions
} from 'mongoose'

interface IProgramService {
  create: (create: IProgram) => Promise<ProgramDocument>
  findOneProgram: (
    query: FilterQuery<ProgramDocument>,
    projection?: ProjectionType<ProgramDocument>,
    options?: QueryOptions<ProgramDocument>
  ) => Promise<ProgramDocument | null>
  findByIdAndUpdateProgram: (
    query: FilterQuery<ProgramDocument>,
    update: UpdateQuery<ProgramDocument>,
    options?: QueryOptions<ProgramDocument>
  ) => Promise<ProgramDocument | null>
  findProgram: (
    query: FilterQuery<ProgramDocument>,
    projection?: ProjectionType<ProgramDocument>,
    options?: QueryOptions<ProgramDocument>
  ) => Promise<ProgramDocument[] | null>
  findByIdProgram: (
    id: FilterQuery<ProgramDocument> | string,
    projection?: ProjectionType<ProgramDocument>,
    options?: QueryOptions<ProgramDocument>,
    populateOptions?: string | PopulateOptions | Array<string | PopulateOptions>
  ) => Promise<ProgramDocument | null>
}

class Program implements IProgramService {
  async create(create: IProgram): Promise<ProgramDocument> {
    const created = new ProgramSchema(create)
    return created.save()
  }

  async findOneProgram(
    program: FilterQuery<ProgramDocument> = {},
    projection: ProjectionType<ProgramDocument> = {},
    options: QueryOptions<ProgramDocument> = {}
  ): Promise<ProgramDocument | null> {
    return await ProgramSchema.findOne(program, projection, options).exec()
  }

  async findByIdAndUpdateProgram(
    program: FilterQuery<ProgramDocument> = {},
    update: UpdateQuery<ProgramDocument> = {},
    options: QueryOptions<ProgramDocument> = {}
  ): Promise<ProgramDocument | null> {
    return await ProgramSchema.findByIdAndUpdate(
      program,
      update,
      options
    ).exec()
  }

  async findProgram(
    program: FilterQuery<ProgramDocument> = {},
    projection: ProjectionType<ProgramDocument> = {},
    options: QueryOptions<ProgramDocument> = {}
  ): Promise<ProgramDocument[] | null> {
    return await ProgramSchema.find(program, projection, options).exec()
  }

  async findByIdProgram(
    program: FilterQuery<ProgramDocument> | string = {},
    projection: ProjectionType<ProgramDocument> = {},
    options: QueryOptions<ProgramDocument> = {},
    populateOptions?: string | PopulateOptions | Array<string | PopulateOptions>
  ): Promise<ProgramDocument | null> {
    const query = await ProgramSchema.findById(program, projection, options)
    if (populateOptions && query) {
      return query.populate(populateOptions)
    }
    return query ?? null
  }
}

export const ProgramService: IProgramService = new Program()
