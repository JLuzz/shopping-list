import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const AuthenticatedRoute = ({ children }) => {
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
          }}
        />
      )}
    </>
  )
}

export default AuthenticatedRoute
