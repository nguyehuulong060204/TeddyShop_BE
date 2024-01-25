import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'

import dbConnection from '~/config/mongodb'
import { env } from '~/config/environment'
import { corsOptions } from './config/cors'

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

app.listen(env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${env.APP_PORT}/`)
})
