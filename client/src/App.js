import { Container } from 'reactstrap'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import AppNavBar from './components/AppNavbar'
import ItemModal from './components/ItemModal'
import React from 'react'
import ShoppingList from './components/ShoppingList'
import store from './store'

import { loadUser } from './actions/authActions'

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
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  )
}

export default App
