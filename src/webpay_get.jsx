import { useEffect, useState } from "react";

export default function Webpay(props){

    const URL = 'https://aquilabrand-api.onrender.com/checkout';

    const [transaction_info, setTransaction_info] = useState();

    const fetchApi = async () => {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: props.token
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