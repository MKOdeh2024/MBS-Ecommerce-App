import React from 'react';
import './cart.css';
import CartList from '../../components/cart/list/list.component';

const CartPage = (props) => {
  return (
    <div className="cart-page">
      <CartList />
    </div>
  );
};

export default CartPage;