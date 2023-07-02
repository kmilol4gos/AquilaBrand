import { useState, useEffect } from "react";
import { useCart } from "./hook/useCart";
import { Cart_Amount, Cart_Cantidad } from "./hook/datosCart";
import { TailSpin } from "react-loader-spinner";

//pagina de confirmacion de compra

//llamar a webpay luego de confirmar compra.

//aca ya llega el carro definitivo para la compra.

//aca se pide la informacion de la cliente.


function Webpay(order_id, session_id, amount) {
	const URL = "http://localhost:3000/checkout";

	const [retorno, setRetorno] = useState();

	const fetchApi = async () => {
		const response = await fetch(URL, {
			method: "POST",
			body: JSON.stringify({
				buy_order: order_id,
				session_id: session_id,
				amount: amount,
				return_url: "http://localhost:5173/summary",
			}),
		});
		const responseJSON = await response.json();
		setRetorno(responseJSON);
	};

	useEffect(() => {
		fetchApi();
	}, []);

	return retorno;
}

function Product_Card({
	PRODUCT_ID,
	PRODUCT_NAME,
	PRODUCT_DESCRIPTION,
	PRECIO,
	quantity,
	SIZE_NAME,
	COLOR_NAME
}) {
	return (
		<li key={PRODUCT_ID}>
			<img alt={PRODUCT_NAME} />
			<div id="titulo-producto">
				<strong>{PRODUCT_NAME}</strong>
			</div>
			<div id="descripcion-producto">
				<strong>{PRODUCT_DESCRIPTION}</strong>
			</div>
			<div id="precio-producto">
				<strong>${PRECIO}</strong>
			</div>
			<div>
				<p>Talla: {SIZE_NAME}</p>
				<p>Color: {COLOR_NAME}</p>
				<strong>Cantidad: {quantity}</strong>
			</div>
		</li>
	);
}

export default function Checkout() {
	const { cart } = useCart();
	const fecha = new Date();
	const dia = fecha.getDate();
	const mes = fecha.getMonth();
	const año = fecha.getFullYear();
	const hora = fecha.getHours();
	const minuto = fecha.getMinutes();
	const segundo = fecha.getSeconds();

	const order_id = "Aquila_" + dia + mes + año + hora + minuto + segundo;
	const session_id =
		"AquilaSession_" + dia + mes + año + hora + minuto + segundo;

	const info = Webpay(order_id, session_id, Cart_Amount());

	if (!info)
		return (
			<div className="relative flex justify-center items-center w-screen h-screen">
				<TailSpin color="#e2fcef" height={80} width={80} />
			</div>
		);

	return (
		<div
			className="flex flex-col justify-center items-center  relative h-screen top-20"
			id="redireccion webpay"
		>
			<div>
				<h1>Informacion personal</h1>
				<form>
					<label>
						Nombre:
						<input type="text" name="name" />
					</label>
					<label>
						Apellido:
						<input type="text" name="lastname" />
					</label>
					<label>
						Email:
						<input type="text" name="email" />
					</label>
					<label>
						Telefono:
						<input type="text" name="phone" />
					</label>
					<label>
						Direccion:
						<input type="text" name="address" />
					</label>
					<label>
						Ciudad:
						<input type="text" name="city" />
					</label>
					<label>
						Region:
						<input type="text" name="region" />
					</label>
				</form>
			</div>
			<div id="info-productos">
				<h1>Detalle de productos</h1>
				{cart.map((item) => (
					<Product_Card key={item.PRODUCT_ID} {...item} />
				))}
				<strong>Cantidad de productos: {<Cart_Cantidad />}</strong>
				<strong>Total a pagar: ${<Cart_Amount />}</strong>
			</div>
			<p>Avanzar</p>
			<form method="post" action={info.url}>
				<input type="hidden" name="token_ws" value={info.token} />
				<input type="submit" value="Ir a pagar" />
			</form>
		</div>
	);
}
