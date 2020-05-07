import { Container } from 'reactstrap'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import React from 'react'
import { useEffect } from 'react'

import AppNavBar from './components/AppNavbar'
import AuthenticatedRoute from './components/auth/authenticated-route'
import ItemModal from './components/ItemModal'
import { loadUser } from './actions/authActions'
import Login from './components/auth/Login'
import ShoppingList from './components/ShoppingList'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavBar />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <AuthenticatedRoute path="/">
              <Container>
                <ItemModal />
                <ShoppingList />
              </Container>
            </AuthenticatedRoute>
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
