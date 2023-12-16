import { Schema, type Document, model } from 'mongoose'
import { type ITeacher } from './Teacher'

export interface ICohort {
  name: string
  code: string
  startDate: string
  EndDate: string
  numberStudents: string
  teachers?: ITeacher[]
}

export type CohortDocument = Document & ICohort

const CohortSchema = new Schema<CohortDocument>({
  name: { type: String, required: true },
  code: { type: String, required: true },
  startDate: { type: String, required: true },
  EndDate: { type: String, required: true },
  numberStudents: { type: String, required: true },
  teachers: [{ type: Schema.ObjectId, ref: 'Teachers' }]
})

export default model<CohortDocument>('Cohorts', CohortSchema)
