import React from "react";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { API_KEY, API_URL } from "../config";
import GoodList from "./GoodList";
import Cart from "./Cart";
import BasketList from "./BasketList";

function Main() {
  const [goods, setGoods] = useState([]);
  const [loader, setLoader] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasket, setIsBasket] = useState(false);

  // add good to Basket
  const addToBasket = (item) => {
    const priceItem = item.price
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            price: orderItem.price + priceItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });
      setOrder(newOder);
    }
  };

// This is the function to close the Basket
  const handleIsBasket = () => {
    setIsBasket(!isBasket);
  };

// This is the function to delete the BasketItem
  const deleteItem = (id) => {
    const findGood = goods.find(item => item.id === id)
    let priceGood = findGood.price

    const newOrder = order.map(item => {
      if(item.id === id){
        return {
          ...item,
          price: item.price - priceGood,
          quantity: item.quantity - 1
        }
      }else{
        return item
      }
    })
    const filterOrder = newOrder.filter(item => item.quantity !== 0)
    setOrder(filterOrder)
  }
 // show all goods
  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.featured && setGoods(data.featured);
        setLoader(false);
      });
  }, []);
  return (
    <div className=" container content">
      <Cart quantity={order.length} handleIsBasket={handleIsBasket }/>
      {loader ? (
        <Loader />
      ) : (
        <GoodList goods={goods} addToBasket={addToBasket} />
      )}
      {isBasket && <BasketList order={order} handleIsBasket={handleIsBasket} deleteItem={deleteItem}/>}
    </div>
  );
}

export default Main;
