import express from 'express'

const app = express()

const hostname = 'localhost'
const port = 8080

app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://${hostname}:${port}/`)
})
