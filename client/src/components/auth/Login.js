import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Container,
} from 'reactstrap'

import { login } from '../../actions/authActions'

const formStyle = {
  margin: '100px auto',
  maxWidth: 420,
  maxHeight: 420,
}

const buttonStyle = {
  marginTop: '2rem',
}

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const error = useSelector((state) => state.error)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { from } = location.state || { from: { pathname: '/' } }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const user = {
      email,
      password,
    }

    // Attempt to login
    dispatch(login(user))
  }

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') setMsg(error.msg.msg)
    else setMsg(null)
  }, [error])

  if (isAuthenticated) history.replace(from)

  return (
    <Container style={formStyle}>
      {msg && <Alert color="danger">{msg}</Alert>}
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="text"
            id="email"
            placeholder="Email"
            className="mb-3"
            onChange={onEmailChange}
          />

          <Label for="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            className="mb-3"
            onChange={onPasswordChange}
          />

          <Button color="dark" style={buttonStyle} block>
            Login
          </Button>
        </FormGroup>
      </Form>
    </Container>
  )
}

export default Login
