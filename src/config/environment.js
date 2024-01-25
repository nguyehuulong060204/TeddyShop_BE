import 'dotenv/config'

export const env = {
  APP_PORT: process.env.APP_PORT || 8081,

  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,

  BUILD_MODE: process.env.BUILD_MODE || 'development'
}
