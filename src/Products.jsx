import react, {useState, useEffect} from 'react';

const category = '0';
const section = '0';

function Products() {

  const URL = 'https://aquilabrand-api.onrender.com/products';

  const [products, setProducts] = useState();

  const fetchApi = async () => {
    const response = await fetch(URL);
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
        products.map((product, index) => {
          return(<li key={product.PRODUCT_ID}>
            <img
              alt={product.PRODUCT_NAME}
            />
            <div id="titulo-producto">
              <strong>{product.PRODUCT_NAME}</strong>
            </div>
            <div id="precio-producto">
              <strong>${product.PRECIO}</strong>
            </div>
            <div id="boton-producto">
              <button>Agregar al carrito</button>
            </div>
            </li>)
        })
      }
    </ul>
  </div>
  );
}

export default Products;