import { useCart } from "./useCart";

export function Cart_Amount (){
    const { cart } = useCart();
    let acc = 0;
    if(!cart) return 'Cargando...';
    const total = cart.map((product) => {
        acc = acc + product.PRECIO * product.quantity;
    })
    total;
    return acc;
}

export function Cart_Cantidad (props){
    const { cart } = useCart();
    if(!cart) return 'Cargando...';

    const cantidad = cart.reduce((acc, curr) => {
        return acc + curr.quantity
    }, 0)
    cantidad;

    return cantidad
}