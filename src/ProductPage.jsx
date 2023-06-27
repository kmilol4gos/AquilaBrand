import { useCart } from "./hook/useCart";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function Sizes({SIZE_NAME, SIZE_ID}){

    return(
        <div id="talla" key={SIZE_ID}>
            <strong>{SIZE_NAME}</strong>
        </div>
    )
}

function Colors({COLOR_ID, COLOR_NAME}){
    return(
        <div id="color" key={COLOR_ID}>
            <strong>{COLOR_NAME}</strong>
        </div>
    )
}

export default function ProductPage(){

    let index = 0;

    const {id} = useParams();

    const { addToCart } = useCart();

    const URL = 'https://aquilabrand-api.onrender.com/product';

    const [product, setProduct] = useState();

    const fetchApi = async () => {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                id: id
            }
        })
        const responseJSON = await response.json();
        setProduct(responseJSON);
    }

    useEffect(() => {
        fetchApi();
    }, []);
    if(!product) return 'Cargando...';

    //falta obtener el index del color y la talla seleccionada

    console.log(product)

    return(
        <div id="producto" className="pt-[50rem]">
            <div id="info-general"> //inicio info producto
                <div id="titulo-producto">
                    <strong>{product[0][0].PRODUCT_NAME}</strong>
                </div>
                <div id="descripcion-producto">
                    <strong>{product[0][0].PRODUCT_DESCRIPTION}</strong>
                </div>
                <div id="precio-producto">
                    <strong>${product[0][0].PRECIO}</strong>
                </div>
            </div> //fin info producto
            <div id="tallas"> //inicio tallas
                <div id="titulo-tallas">
                    <strong>Tallas</strong>
                    {product[2].map((talla, index) => (
                        <Sizes 
                            key={talla.SIZE_ID}
                            {...talla}
                        />
                    ))}
                </div>
            </div> //fin tallas

            <div id="colores"> //inicio colores
                <div id="titulo-colores">
                    <strong>Colores</strong>
                    {product[1].map((color) => (
                        <Colors 
                            key={color.COLOR_ID}
                            {...color}
                        />
                    ))}
                </div>

            </div> //fin colores
            <div id="boton carrito">
                <button onClick={() => addToCart(product[0][index])}>Agregar al carrito</button>
            </div>
        </div>
    )
}