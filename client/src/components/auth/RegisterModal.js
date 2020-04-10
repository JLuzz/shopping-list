import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap'

import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

const RegisterModal = ({ ...props }) => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const error = useSelector((state) => state.error)

  const toggle = () => {
    //  Clear errors
    dispatch(clearErrors())
    setModal(!modal)
  }

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    // Create User object
    const newUser = { name, email, password }
    dispatch(register(newUser))
  }

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') setMsg(error.msg.msg)
    else setMsg(null)
  }, [error])

  useEffect(() => {
    // If authenticated, close modal
    if (modal && isAuthenticated) toggle()
  })

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {msg && <Alert color="danger">{msg}</Alert>}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={onNameChange}
              />

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
                type="text"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={onPasswordChange}
              />

              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default RegisterModal
