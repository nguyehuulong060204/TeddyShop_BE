import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'

import dbConnection from '~/config/mongodb'
import { env } from '~/config/environment'
import { corsOptions } from '~/config/cors'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

// config express, morgan, bodyParser, cookieParser and helmet
const app = express()
app.use(cors(corsOptions))
app.use(helmet())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// connect to mongodb
dbConnection()

// V1 API routes
app.use('/api/v1', APIs_V1)

// middleware xử lý lỗi tập trung
app.use(errorHandlingMiddleware)

app.listen(env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${env.APP_PORT}/`)
})
