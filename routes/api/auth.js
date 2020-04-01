import express from 'express'
import bcrypt from 'bcryptjs'
const router = express.Router()
import jwt from 'jsonwebtoken'

import config from 'config'

// User model
import User from '../../models/User'

// @route   POST api/auth
// @desc    Authenticate user
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: 'User does not exist' })

    //  Validate passwords
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

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

export default router
