import Webpay from "./webpay_post"
import { useCart } from "./hook/useCart";

//pagina de confirmacion de compra

//pendiente de termino de diseño e implementacion de carro de compras

//llamar a webpay luego de confirmar compra.

export default function Checkout() {

    const { calcularTotal } = useCart();
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth();
    const año = fecha.getFullYear();
    const hora = fecha.getHours();
    const minuto = fecha.getMinutes();
    const segundo = fecha.getSeconds();

    const order_id = 'Aquila_' + dia + mes + año + hora + minuto + segundo;
    const session_id = 'AquilaSession_' + dia + mes + año + hora + minuto + segundo;

    const total = calcularTotal();

    const info_redireccion = <Webpay order_id={order_id} session_id={session_id} amount={total}/>

    const url = info_redireccion.url;
    const token = info_redireccion.token;


    //falta hacer el diseño de la pagina de confirmacion de compra
    //no borrar el form, es necesario para redireccionar a webpay
    return (
        <div className="flex flex-col justify-center items-center" id="redireccion webpay">
            <form method="post" action={url}>
                <input type="hidden" name="token_ws" value={token} />
                <input type="submit" value="Ir a pagar"/>
            </form>
        </div>
    )
}