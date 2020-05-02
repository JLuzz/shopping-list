import React, { useState, useEffect, Fragment } from 'react'
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

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const error = useSelector((state) => state.error)

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

          <Button color="dark" style={{ marginTop: '2rem' }} block>
            Login
          </Button>
        </FormGroup>
      </Form>
    </Container>
  )
}

export default Login
