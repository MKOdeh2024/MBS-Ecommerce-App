import React from "react";
import "./list.css";
import { useContext } from "react";
import { CartContext } from "../../providers/cart-provider.component";
import CartRow from "../row/row.component";
import { UserContext } from "../../providers/user-provider.component";

const CartList = (props) => {
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);
  console.log(cartContext.cart);
  const clear = () => cartContext.dispatch({ type: "CLEAR" });

  if (cartContext.cart.length === 0) {
    return (
      <div className="no-results">
        <img src="./empty_cart.webp" alt="empty cart" width={300} />
        <p>Your Cart is Empty!</p>
      </div>
    );
  }

  let total = 0;

  for (const item of cartContext.cart) {
    total += item.quantity * item.meal.price;
  }
  async function placeOrder() {
    let fd = new FormData();
    let ci = [];
    fd.append("uid", userContext.user?.id);
    fd.append("token", userContext.user?.token);
    cartContext.cart.forEach((item) => {
      //console.log(item.meal);
      ci.push({ meal: { id: item.meal.id, quantity: item.quantity } });
    });
    //console.log(ci);
    //console.log(cartContext.cart);
    fd.append("items", JSON.stringify(ci));
    // for (const item of cartContext.cart) {
    //   ci.push(JSON.stringify({"item_id":item.id,"item_quantity":item.quantity}));
    //   //total += item.quantity * item.meal.price;
    // }
    //fd.append("items",JSON.stringify(cartContext.cart));
    await fetch("https://openme.click/api/place_order.php", {
      method: "POST",
      body: fd,
    })
      .then(async (r) => {
        const response = await r.json();
        //console.log(response);
        if (response.res == "succeeded") {
          //console.log(response.id);
          clear();
        } else {
          alert(response.text);
        }
      })
      .catch((error) => {
        console.error(error);
        //return null;
      });
  }
  return (
    <>
      <ul className="cart-list">
        {cartContext.cart.map((item, index) => (
          <CartRow
            item={item}
            dispatch={cartContext.dispatch}
            key={"r_" + index}
          />
        ))}
      </ul>
      <div className="cartBottomRow">
        <button className="nemo-button grey" onClick={clear}>
          Clear Cart
        </button>

        <span>Total: ${total}</span>

        <button className="nemo-button grey" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </>
  );
};

export default CartList;
