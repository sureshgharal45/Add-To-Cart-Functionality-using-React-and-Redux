const INIT_STATE = {
  carts: [],
};

export const cartReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":

      const ItemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
        
      );
      console.log(ItemIndex);

      if (ItemIndex >= 0) {
        state.carts[ItemIndex].qnty += 1
        return {
            ...state,
            carts:[...state.carts]
        }

      } else {
        const temp = { ...action.payload, qnty: 1 }
        return {
          ...state,
          carts: [...state.carts, temp],
        }
      }
      

    case "REMOVE_CART":
      const data = state.carts.filter((el) => el.id !== action.payload);

      return {
        ...state,
        carts: data
      };
     

    case "RMV_ONE":

      const ItemIndex_dec = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.carts[ItemIndex_dec].qnty >= 1) {
        const deleteItem = state.carts[ItemIndex_dec].qnty -= 1;

        return {
          ...state,
          carts: [...state.carts]
        };

      } else if (state.carts[ItemIndex_dec].qnty === 1) {
        const data = state.carts.filter((el) => el.id !== action.payload);

        return {
          ...state,
          carts: data
        };
      }

    default:
      return state;
  }
};
