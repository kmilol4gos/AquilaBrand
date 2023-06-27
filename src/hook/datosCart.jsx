import { useCart } from "./useCart";

export function Cart_Amount (){
    const { cart, clearCart, addToCart, calcularTotal, removeFromCart, calcularCantidad } = useCart();
    let acc = 0;
    const total = cart.map((product) => {
        acc = acc + product.PRECIO * product.quantity;
    })
    console.log(acc)
    return acc
}

export function Cart_Cantidad (){
    const { cart } = useCart();

    const cantidad = cart.reduce((acc, curr) => {
        return acc + curr.cantidad
    })

    return cantidad
}