import express from 'express'
import bcrypt from 'bcryptjs'
const router = express.Router()
import jwt from 'jsonwebtoken'

import config from 'config'

// User model
import User from '../../models/User'

// @route   POST api/users/
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: 'User already exists' })

    const newUser = new User({
      name,
      email,
      password
    })

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get('jwtKey'),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err
              res.json({
                token,
                id: user.id,
                name: user.name,
                email: user.email
              })
            }
          )
        })
      })
    })
  })
})

export default router
