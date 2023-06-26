import { useEffect, useState } from "react";

export default function Webpay(props){

    const URL = 'https://aquilabrand-api.onrender.com/checkout';

    const [retorno, setRetorno] = useState();

    const fetchApi = async () => {
        const response = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify({
                buy_order: props.order_id,
                session_id: props.session_id,
                amount: props.amount,
                return_url: "http://localhost:5173/resultado",
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