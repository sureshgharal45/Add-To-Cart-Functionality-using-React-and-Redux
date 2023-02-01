export const ADD = (item) => {
  return {
    type: "ADD_CART",
    payload: item
  }
}
//remove items
export const DLT = (id) => {
  return {
    type: "REMOVE_CART",
    payload: id
  }
}

//remove individual items
export const REMOVE = (item) => {
  return {
    type: "RMV_ONE",
    payload: item
  }
}

