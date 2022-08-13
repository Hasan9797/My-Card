import React from 'react'

function BasketItem(props) {
    const {id, name, price, quantity, deleteItem = Function.prototype} = props;
  return (
    <li className='collection-item' key={id}>
        {name} x{quantity} = {price} $
        <span className='secondary-content'>
            <i className='material-icons basket-delete' onClick={() => deleteItem(id)}>delete_forever</i>
        </span>
    </li>
  )
}

export default BasketItem