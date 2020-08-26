import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, useLocation } from 'react-router-dom'

const AuthenticatedRoute = ({ children }) => {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth)

  if (isLoading) return null

  return (
    <>
      {isAuthenticated ? (
        <Route>{children}</Route>
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )}
    </>
  )
}

export default AuthenticatedRoute
