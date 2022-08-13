function Cart(props) {
  const { quantity = 0, handleIsBasket = Function.prototype } = props;
  return <div className="cart blue darken-4 white-text" onClick={() => handleIsBasket()}>
    <i className="material-icons">add_shopping_cart</i>
    {quantity ? <span className>{quantity}</span> : null}
  </div>;
}

export default Cart;
