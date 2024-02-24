const getCartQuantity = (id, cart) => {
  const currentCartItem = cart.find(cartItem => (cartItem.meal.id === id));
  if (currentCartItem) {
    return currentCartItem.quantity;
  } else {
    return 0;
  }
};


export {
  getCartQuantity
};