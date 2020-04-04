import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'reactstrap'

import { logout } from '../../actions/authActions'

const Logout = () => {
  const dispatch = useDispatch()

  return (
    <Fragment>
      <NavLink onClick={() => dispatch(logout())} href="#">
        Logout
      </NavLink>
    </Fragment>
  )
}

export default Logout
