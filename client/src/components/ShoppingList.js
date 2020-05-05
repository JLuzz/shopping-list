import React, { useEffect } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { getItems, deleteItem } from '../actions/itemActions'
import ItemModal from '../components/ItemModal'

const ShoppingList = () => {
  const dispatch = useDispatch()

  const items = useSelector((state) => state.item.items)
  const itemsLoading = useSelector((state) => state.item.loading)

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  return (
    <Container>
      <ItemModal />
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {!itemsLoading &&
            items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => dispatch(deleteItem(_id))}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  )
}

// ShoppingList.propTypes = {
//   items: PropTypes.object.isRequired,
// }

export default ShoppingList
