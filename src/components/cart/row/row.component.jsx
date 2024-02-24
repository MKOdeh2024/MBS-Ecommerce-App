import React from 'react';
import trashIcon from '../../../assets/trash.svg';
import './row.css';

const CartRow = (props) => {
  const { meal, quantity } = props.item;

  const increment = () => props.dispatch({ type: 'INCREMENT_CART_QUANTITY', meal });
  const decrement = () => props.dispatch({ type: 'DECREMENT_CART_QUANTITY', meal });
  const deleteItem = () => props.dispatch({ type: 'DELETE_CART_ITEM', meal });

  return (
    <li className="cart-row">
      <img src={meal.image} alt="meal" />
      <div className="main-info">
        <h2>{meal.name}</h2>
        <span className="item-price">
          ${meal.price}
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span>In Stock</span></span>
        <div className="quantity-selector">
          <button onClick={increment}>&#43;</button>
          {quantity}
          <button onClick={decrement}>&#8722;</button>
        </div>
      </div>
      <div className="total-price">
        <h3>${meal.price * quantity}</h3>
        <button onClick={deleteItem}>
          <img src={trashIcon} alt="delete" />Delete
        </button>
      </div>
    </li>
  );
};

export default CartRow;