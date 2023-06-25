import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider ({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = product => {
        //check
        const productInCartIndex = cart.findIndex(item => item.id === product.id);

        if (productInCartIndex >= 0) {
            const newCart = structuredClone(cart);
            newCart[productInCartIndex].quantity += product.quantity;
            return setCart(newCart);
        }

        //add si no esta en el carrito
        setCart(prevState => ([
            ...prevState,
            {
                ...product,
                quantity: 1
            }
        ]))
    };
    const removeFromCart = product => {};
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            clearCart }}
            >
                {children}
        </CartContext.Provider>
    );
};