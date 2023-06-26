import Webpay from "./webpay_get";

export default function Transaction_detail(){

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token_ws');

    const transaction_info = <Webpay token={token}/>

    return(
        <div className="flex flex-col justify-center items-center">
            <h1>Detalle de transacción</h1>
            <h2>Orden de compra: {transaction_info.buy_order}</h2>
            <h2>Fecha de transacción: {transaction_info.transaction_date}</h2>
            <h2>Estado de la transacción: {transaction_info.status}</h2>
            <h2>Monto de la transacción: {transaction_info.amount}</h2>
        </div>
    )

}