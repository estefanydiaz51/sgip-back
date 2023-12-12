import mongoose from 'mongoose'
import { DB_ACCESS } from '../config'

const dbConnect = (): void => {
  mongoose.connect(DB_ACCESS, {
    autoCreate: true
  })
    .then(_db => { console.log('DB is connected') })
    .catch(err => { console.error(err) })
}

export default dbConnect
