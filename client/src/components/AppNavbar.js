import React, { useState, Fragment } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap'
import { useSelector } from 'react-redux'

import Logout from './auth/Logout'

const AppNavbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">ShoppingList</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated && (
                <Fragment>
                  <NavItem>
                    <span className="navbar-text mr-3">
                      <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                  </NavItem>
                  <NavItem>
                    <Logout />
                  </NavItem>
                </Fragment>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppNavbar
