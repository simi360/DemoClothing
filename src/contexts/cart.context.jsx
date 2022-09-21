import { createContext, useState } from "react";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems};
    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>)
}