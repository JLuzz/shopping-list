import { Container } from 'reactstrap'
import { Provider } from 'react-redux'
import React from 'react'
import { useEffect } from 'react'

import AppNavBar from './components/AppNavbar'
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
      <div className="App">
        <AppNavBar />
        <Login />
        {/* <ItemModal />
          <ShoppingList /> */}
      </div>
    </Provider>
  )
}

export default App
