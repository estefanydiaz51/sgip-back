import mongoose, { model, type Document } from 'mongoose'
const { Schema } = mongoose

export interface IRoles {
  name: string
  permissions: string[]
}

export type RoleDocument = Document & IRoles

const RoleSchema = new Schema({
  name: { type: String, required: true },
  permissions: [{ type: String, required: true }]
})

export default model<RoleDocument>('Roles', RoleSchema)
