import react, {useState, useEffect} from 'react';

const category = '0';
const section = '0';

function Products() {

  //const [articulos, setArticulos] = useState([])

  const URL = 'https://aquilabrand-api.onrender.com/products';

  const showProducts = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    //return data;
  };
  showProducts();
}

export default Products;