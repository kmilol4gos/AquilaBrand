import {useState, useEffect} from 'react';
import { useCart } from './hook/useCart';

function Product_Card({id, PRODUCT_NAME, PRODUCT_DESCRIPTION, PRECIO, addToCart }){
  return(<li key={id}>
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
    <div id="boton-producto">
      <button onClick={addToCart}>Agregar al carrito</button>
    </div>
    </li>)
}

function Products(props) {

  console.log(props);

  const { addToCart, cart} = useCart();

  const URL = 'https://aquilabrand-api.onrender.com/products';

  const [products, setProducts] = useState();

  const fetchApi = async () => {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        category: props.category,
        section: props.section
      }
    });
    const responseJSON = await response.json();
    setProducts(responseJSON);
  }

  useEffect(() => {
    fetchApi();
  }, []);


  return(
  <div id="product-card">
    <ul>
      {!products ? 'Cargando...' : 
        products.map((product, index) => (
          <Product_Card
            key={product.PRODUCT_ID}
            addToCart = {() => addToCart(product)}
            {...product}
          />
        ))}
    </ul>
  </div>
  );
}

export default Products;