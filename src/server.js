import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dbConnection from '~/config/mongodb'

import { env } from '~/config/environment'

// config express, morgan, bodyParser, cookieParser
const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// connect to mongodb
dbConnection()

app.listen(env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${env.APP_PORT}/`)
})
