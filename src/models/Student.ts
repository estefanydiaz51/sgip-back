import { Schema, type Document, model } from 'mongoose'
import { type IProgram } from './Program'
import { type ICohort } from './Cohort'

export interface IStudent {
  name: string
  id: string
  studentCode: string
  photo: string
  address: string
  phone: string
  gender: string
  birthDay: string
  semester: string
  civilStatus: string
  ingressDate: string
  egressDate: string
  email: string
  programs?: IProgram[]
  cohort: ICohort
}

export type StudentDocument = Document & IStudent

const StudentSchema = new Schema<StudentDocument>({
  name: { type: String, required: true },
  id: { type: String, required: true },
  studentCode: { type: String, required: true },
  photo: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  birthDay: { type: String, required: true },
  semester: { type: String, required: true },
  civilStatus: { type: String, required: true },
  ingressDate: { type: String, required: true },
  egressDate: { type: String, required: true },
  email: { type: String, required: true },
  programs: [{ type: Schema.ObjectId, ref: 'Programs' }],
  cohort: { type: Schema.ObjectId, ref: 'Cohorts' }
})

export default model<StudentDocument>('Students', StudentSchema)
