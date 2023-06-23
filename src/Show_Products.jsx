import Products from "./Products";

const category = "all";
const section = "all";

const articulos = Products(category, section);

export default function ShowProducts(articulos) {
    return (
        <div>
            <ul>
                {articulos.map((articulo) => (
                    <li key={articulo.id}>
                        <h1>{articulo.name}</h1>
                        <h2>{articulo.price}</h2>
                        <h3>{articulo.description}</h3>
                        <h4>{articulo.category}</h4>
                        <h5>{articulo.section}</h5>
                    </li>
                ))}
            </ul>
        </div>
    )
}