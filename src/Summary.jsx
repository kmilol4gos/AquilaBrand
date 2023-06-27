import { useEffect, useState } from "react";
import { useCart } from "./hook/useCart";
import { Cart_Cantidad } from "./hook/datosCart";

function Webpay(token){

    const URL = 'https://aquilabrand-api.onrender.com/checkout';

    const [transaction_info, setTransaction_info] = useState();

    const fetchApi = async () => {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: token
            }
        })
        const responseJSON = await response.json();
        setTransaction_info(responseJSON);
    }

    useEffect(() => {
        fetchApi();
    }, []);

    return transaction_info;
}

function Product_Card({PRODUCT_ID, PRODUCT_NAME, PRODUCT_DESCRIPTION, PRECIO, addToCart }){
    return(<li key={PRODUCT_ID}>
    <img
        alt={PRODUCT_NAME}
    />
    <div id="titulo-producto">
        <strong>{PRODUCT_NAME}</strong>
    </div>
    <div id="descripcion-producto">
        <strong>{PRODUCT_DESCRIPTION}</strong>
    </div>
    <div id="precio-producto">
        <strong>${PRECIO}</strong>
    </div>
    </li>)
}

export default function Summary(){

    const {cart} = useCart();

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token_ws');

    const transaction_info = Webpay(token);

    console.log(transaction_info)

    if(!transaction_info) return 'Cargando...';
    
    return(
        <div className="flex flex-col justify-center items-center">
            <div id="info-transaccion">
                <h1>Detalle de transacción</h1>
                <h2>Orden de compra: {transaction_info.buy_order}</h2>
                <h2>Fecha de transacción: {transaction_info.transaction_date}</h2>
                <h2>Estado de la transacción: {transaction_info.status}</h2>
                <h2>Monto de la transacción: {transaction_info.amount}</h2>
            </div>
            <div id="info-productos">
                <h1>Detalle de productos</h1>
                {cart.map((item) => (
                    <Product_Card 
                        key={item.PRODUCT_ID}
                        {...item}/>
                ))}
                <p>Cantidad de productos: {<Cart_Cantidad />}</p>
            </div>
        </div>
    )

}