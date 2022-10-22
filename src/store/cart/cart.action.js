import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
    //1. find if the productToAdd exists in cartItems
    
    const exisitingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    
    //2. If found, +1 the quantity and RETURN
    
    if (exisitingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
    }

    //3. RETURN: new array with modified cartItems if productToAdd is not found
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const exisitingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
    if (exisitingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id
    ? {...cartItem, quantity: cartItem.quantity - 1}
    : cartItem
    );

}

const clearCartItem = (cartItems, cartItemToClear) => {

        return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
    
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const setIsCartOpen = (bool) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)


// export const setIsCartOpen = (boolean) =>
//   createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);