import { useState, useEffect } from "react";
import { useCart } from "./hook/useCart";
import { Cart_Amount } from "./hook/datosCart";


//pagina de confirmacion de compra

//pendiente de termino de diseño e implementacion de carro de compras

//llamar a webpay luego de confirmar compra.

function Webpay(order_id, session_id, amount){

    const URL = 'https://aquilabrand-api.onrender.com/checkout';

    const [retorno, setRetorno] = useState();

    const fetchApi = async () => {
        const response = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify({
                buy_order: order_id,
                session_id: session_id,
                amount: amount,
                return_url: "http://localhost:5173/summary",
            })
        });
        const responseJSON = await response.json();
        setRetorno(responseJSON);
    }

    useEffect(() => {
        fetchApi();
    }, []);


    return retorno;
}

export default function Checkout() {

    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth();
    const año = fecha.getFullYear();
    const hora = fecha.getHours();
    const minuto = fecha.getMinutes();
    const segundo = fecha.getSeconds();


    const order_id = 'Aquila_' + dia + mes + año + hora + minuto + segundo;
    const session_id = 'AquilaSession_' + dia + mes + año + hora + minuto + segundo;


    const info = Webpay(order_id, session_id, Cart_Amount());

    if(!info) return (<div>Cargando...</div>);

    //falta hacer el diseño de la pagina de confirmacion de compra, mostrar el carro de compras y el total a pagar
    //no borrar el form, es necesario para redireccionar a webpay
    return (
        <div className="flex flex-col justify-center items-center  pt-[50rem]" id="redireccion webpay">
            <p>Chupa el pico</p>
            <form method="post" action={info.url}>
                <input type="hidden" name="token_ws" value={info.token} />
                <input type="submit" value="Ir a pagar"/>
            </form>
        </div>
    )
}