import { Schema, type Document, model } from 'mongoose'

export interface ITeacher {
  name: string
  idCard: string
  address: string
  phone: string
  email: string
  gender: string
  birthDay: string
  academicTraining: string
  knowledgeAreas: string[]
}

export type TeacherDocument = Document & ITeacher

const TeacherSchema = new Schema<TeacherDocument>({
  name: { type: String, required: true },
  idCard: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  birthDay: { type: String, required: true },
  academicTraining: { type: String, required: true },
  knowledgeAreas: { type: [], required: true }
})

export default model<TeacherDocument>('Teachers', TeacherSchema)
