import 'dotenv/config'

export const env = {
  APP_PORT: process.env.APP_PORT || 8081,

  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,

  BUILD_MODE: process.env.BUILD_MODE || 'development',

  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET,

  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET
}
