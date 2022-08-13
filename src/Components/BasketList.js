import React from "react";
import BasketItem from "./BasketItem";

function BasketList(props) {
  const { order, handleIsBasket, deleteItem } = props;

  const totalPrice = order.reduce((sum, el) => {
    return sum + el.price;
  }, 0);
  return (
    <div className="bsk">
      <ul className="collection basket-list">
        <li className="collection-item active">Basket</li>
        {order.length ? (order.map((item) => {
            return (
              <BasketItem key={item.id} {...item} deleteItem={deleteItem} />
            );
          })) : (<li className="collection-item">Basket is empty</li>
        )}
        <li className="collection-item active">Total Price: {totalPrice} $</li>
        <i className="material-icons basket-close" onClick={handleIsBasket}>
          close
        </i>
      </ul>
    </div>
  );
}

export default BasketList;
