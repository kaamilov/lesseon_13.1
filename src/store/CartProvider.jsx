import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
  items: [],
  totalAmount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.item.id;
      });
      const exestengItem = state.items[existingCartItemIndex];

      let updatadItems;

      if (exestengItem) {
        const updatedItem = {
          ...exestengItem,
          amount: exestengItem.amount + 1,
        };
        updatadItems = [...state.items];
        updatadItems[existingCartItemIndex] = updatedItem;
      } else {
        updatadItems = state.items.concat(action.item);
      }
      return {
        items: updatadItems,
        totalAmount: updatedTotalAmount,
      };
    }
    case "REMOVE": {
      const exestingCartItemIndex = state.items.findIndex((item) => {
        return item.id === action.id;
      });
      const exestingItem = state.items[exestingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - exestingItem.price ;

      let updatedItems;
      if (exestingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...exestingItem,
          amount: exestingItem.amount - 1
        };
        updatedItems = [...state.items];
        updatedItem[exestingCartItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(reducer, initialState);

  const addItemToCartHandler = (item) => {
    dispatch({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    console.log(id);
    dispatch({ type: "REMOVE", id: id });
  };

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
