import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import config from 'config'

import items from './routes/api/items'
import users from './routes/api/users'
import auth from './routes/api/auth'

const app = express()

// Bodyparser Middleware
app.use(express.json())

// DB config
const db = config.get('mongoURI')

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// Use Routes
app.use('/api/items', items)
app.use('/api/users', users)
app.use('/api/auth', auth)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server start on port ${port}`))
