import { Minus, Plus } from "phosphor-react";

const PriceBar = (props) => {
  const handleIncrement = () => {
    props.dispatch({ type: 'INCREMENT_CART_QUANTITY', meal: props.item });
  };

  const handleDecrement = () => {
    props.dispatch({ type: 'DECREMENT_CART_QUANTITY', meal: props.item });
  };

  return (
    <div className="price">
      <span>${props.item.price}</span>
      <div className="add-cart">
        <button onClick={handleIncrement}><Plus size={32} /></button>
        <input type="number" max={500} value={props.cartQuantity} disabled />
        <button onClick={handleDecrement}><Minus size={32} /></button>
      </div>
    </div>
  );
};

export default PriceBar;