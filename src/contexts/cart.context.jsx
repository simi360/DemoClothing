import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    cartQuantity: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem)=>total+cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, cartCount};
    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>)
}