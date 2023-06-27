import { useCart } from "./hook/useCart";
import { useState } from "react";


export default function ProductPage(props){

    const {cart, addToCart } = useCart();

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('product_id');

    const URL = 'https://aquilabrand-api.onrender.com/product';

    const [product, setProduct] = useState();

    const fetchApi = async () => {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                product_id: props.product_id
            }
        })
        const responseJSON = await response.json();
        setProduct(responseJSON);
    }

    if(!product) return 'Cargando...';
}