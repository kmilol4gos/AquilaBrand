import { useReducer, createContext } from "react";
import { cartReducer, cartInitialState } from "../reducers/cart";

export const CartContext = createContext();

function useCartReducer() {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    })

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearCart = () => dispatch({
        type: 'CLEAR_CART'
    })

    const calcularTotal = () => dispatch({
        type: 'CALCULAR_TOTAL'
    })

    return { state, addToCart, removeFromCart, clearCart, calcularTotal}
}

export function CartProvider ({ children }) {
    
    const { state, addToCart, removeFromCart, clearCart, calcularTotal } = useCartReducer();

    return (
        <CartContext.Provider value={{ 
            cart: state, 
            addToCart, 
            removeFromCart, 
            clearCart,
            calcularTotal}}
            >
                {children}
        </CartContext.Provider>
    );
};