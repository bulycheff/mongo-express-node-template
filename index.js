const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const routers = require('./src/routes')

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

routers.forEach(router => {
  app.use(`/api/v1/${router.path}`, router.routes)
})

app.get('/', (req, res) => {
  res.status(200).json('Hello express!')
})

try {
  mongoose.connect(`${MONGO_URI}`).then(() => {
    console.log(`Mongo Connected!`)
  })
} catch (e) {
  console.log({ message: 'Mongo Connection Error!', error: e.message })
}

app.listen(PORT, () => console.log(`App started on port ${PORT}`))

