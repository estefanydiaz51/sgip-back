import CohortSchema, {
  type ICohort,
  type CohortDocument
} from '../../models/Cohort'
import {
  type UpdateQuery,
  type FilterQuery,
  type ProjectionType,
  type QueryOptions
} from 'mongoose'

interface ICohortService {
  create: (create: ICohort) => Promise<CohortDocument>
  findOneCohort: (
    query: FilterQuery<CohortDocument>,
    projection?: ProjectionType<CohortDocument>,
    options?: QueryOptions<CohortDocument>
  ) => Promise<CohortDocument | null>
  findByIdAndUpdateCohort: (
    query: FilterQuery<CohortDocument>,
    update: UpdateQuery<CohortDocument>,
    options?: QueryOptions<CohortDocument>
  ) => Promise<CohortDocument | null>
  findCohort: (
    query: FilterQuery<CohortDocument>,
    projection?: ProjectionType<CohortDocument>,
    options?: QueryOptions<CohortDocument>
  ) => Promise<CohortDocument[] | null>
  findByIdCohort: (
    id: FilterQuery<CohortDocument> | string,
    projection?: ProjectionType<CohortDocument>,
    options?: QueryOptions<CohortDocument>
  ) => Promise<CohortDocument | null>
}

class Cohort implements ICohortService {
  async create(create: ICohort): Promise<CohortDocument> {
    const created = new CohortSchema(create)
    return created.save()
  }

  async findOneCohort(
    Cohort: FilterQuery<CohortDocument> = {},
    projection: ProjectionType<CohortDocument> = {},
    options: QueryOptions<CohortDocument> = {}
  ): Promise<CohortDocument | null> {
    return await CohortSchema.findOne(Cohort, projection, options).exec()
  }

  async findByIdAndUpdateCohort(
    Cohort: FilterQuery<CohortDocument> = {},
    update: UpdateQuery<CohortDocument> = {},
    options: QueryOptions<CohortDocument> = {}
  ): Promise<CohortDocument | null> {
    return await CohortSchema.findByIdAndUpdate(Cohort, update, options).exec()
  }

  async findCohort(
    Cohort: FilterQuery<CohortDocument> = {},
    projection: ProjectionType<CohortDocument> = {},
    options: QueryOptions<CohortDocument> = {}
  ): Promise<CohortDocument[] | null> {
    return await CohortSchema.find(Cohort, projection, options).exec()
  }

  async findByIdCohort(
    Cohort: FilterQuery<CohortDocument> | string = {},
    projection: ProjectionType<CohortDocument> = {},
    options: QueryOptions<CohortDocument> = {}
  ): Promise<CohortDocument | null> {
    return await CohortSchema.findById(Cohort, projection, options).exec()
  }
}

export const CohortService: ICohortService = new Cohort()
