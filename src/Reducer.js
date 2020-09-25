import shuffle from "react";

export const initialState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket) =>
  basket.reduce((amount, item) => item.price + amount, 0);

const incrementAmount = (totalAmount, priceToAdd) => {
  return totalAmount + priceToAdd;
};
const decrementAmount = (totalAmount, priceToRemove) => {
  // ,
  // totalAmount : decrementAmount(state.basket.totalAmount,action.item.price)
  return totalAmount - priceToRemove;
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id == action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can\'t remove product (id: ${action.id}) as its not in baske! `
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return { ...state, user: action.user };

    case "shuffle": {
      let newBasket = [...state.basket];
      return {
        ...state,
        basket: newBasket.sort((a,b) => 0.5  - Math.random()*newBasket.length),
      };
    }
    
    case "EMPTY_BASKET":{
      return{
          ...state,
          basket:[]
      };
    }
    default:
      return state;
  }
};

export default reducer;
