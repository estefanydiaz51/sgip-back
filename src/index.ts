import express from 'express'
import { PORT } from './config'
import router from './router'
import cookieParser from 'cookie-parser'
import dbConnect from './libs/database'
import cors from 'cors'
const app = express()

// DB connect
dbConnect()
app.set('trust proxy', true)
app.use(cookieParser())
app.use(express.json())
// Configuración del middleware CORS
app.use(
  cors({
    origin: '*'
  })
)

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
