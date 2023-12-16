import { Schema, type Document, model } from 'mongoose'
import { type ICohort } from './Cohort'

export interface IProgram {
  name: string
  id: string
  description: string
  logo: string
  email: string
  researchLines: string
  dateRegistration: string
  numberResolutionOfQualifiedRegistration: string
  resolutionFile: string
  cohorts?: ICohort[]
}

export type ProgramDocument = Document & IProgram

const ProgramSchema = new Schema<ProgramDocument>({
  name: { type: String, required: true },
  id: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true },
  email: { type: String, required: true },
  researchLines: { type: String, required: true },
  dateRegistration: { type: String, required: true },
  numberResolutionOfQualifiedRegistration: { type: String, required: true },
  resolutionFile: { type: String, required: true },
  cohorts: [{ type: Schema.ObjectId, ref: 'Cohorts' }]
})

export default model<ProgramDocument>('Programs', ProgramSchema)
