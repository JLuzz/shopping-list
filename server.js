import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import items from './routes/api/items'

const app = express()

// Bodyparser Middleware
app.use(bodyParser.json())

// DB config
import db from './config/keys'

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// Use Routes
app.use('/api/items', items)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server start on port ${port}`))
