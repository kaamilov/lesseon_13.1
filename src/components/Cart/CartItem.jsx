import React from "react";
import classes from "./CartItem.module.css";
const CartItem = (props) => {
  return (
    <li className={classes["cart-item"]}>
      <h2>{props.name}</h2>
      <div>
        <span className={classes.price}>{props.price}</span>
        <span className={classes.amount}>X{props.amount}</span>
      </div>
      <div className={classes.actions}>
        <button
          onClick={() => {
            props.removeItem(props.id);
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            props.onAdd(props.item);
          }}
        >
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
