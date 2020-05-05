import React, { useEffect } from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { getItems, deleteItem } from '../actions/itemActions'

const ShoppingList = () => {
  const dispatch = useDispatch()

  const items = useSelector((state) => state.item.items)
  const itemsLoading = useSelector((state) => state.item.loading)

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  return (
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
  )
}

ShoppingList.propTypes = {
  items: PropTypes.object.isRequired,
}

export default ShoppingList
