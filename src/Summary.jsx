import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Check from "./assets/circle-check-filled.svg";
import Rejected from "./assets/rejected-icon.svg";
import { useCart } from "./hook/useCart";

function Webpay(token) {
	const URL = "https://server.aquilabrand.cl/checkout";

	const [transaction_info, setTransaction_info] = useState();
	const fetchApi = async () => {
		const response = await fetch(
			URL + "?" + new URLSearchParams({ token: token }),
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const responseJSON = await response.json();
		setTransaction_info(responseJSON);
	};

	useEffect(() => {
		fetchApi();
	}, []);

	return transaction_info;
}

function obtenerDatos(token) {
	const URL = "https://server.aquilabrand.cl/transactions";

	const [transactionData, setTransactionData] = useState();

	const fetchApi = async () => {
		const response = await fetch(
			URL + "?" + new URLSearchParams({ token: token }),
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const responseJSON = await response.json();
		setTransactionData(responseJSON);
	};

	useEffect(() => {
		fetchApi();
	}, []);

	return transactionData;
}

function ActualizarEstado(nuevo_estado, token) {
	const URL = "https://server.aquilabrand.cl/transactions";
	let respuesta;

	const fetchApi = async () => {
		const response = await fetch(
			URL + "?" + new URLSearchParams({ token: token, estado: nuevo_estado }),
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const responseJSON = await response.json();
		respuesta = responseJSON;
	};

	fetchApi();
}

function Product_Card({
	PRODUCT_ID,
	PRODUCT_NAME,
	PRODUCT_DESCRIPTION,
	PRECIO,
	quantity,
	SIZE_NAME,
	COLOR_NAME,
	image,
}) {
	let ImagePrincipal = [];
	const filterImages = image.filter(
		(item) => item.COLOR_NAME === COLOR_NAME && item.PRODUCT_ID === PRODUCT_ID
	);
	if (!filterImages[0]) {
	} else {
		ImagePrincipal = filterImages[0].IMAGE;
	}
	return (
		<div
			key={PRODUCT_ID}
			className="flex items-center md:w-[90%]  justify-around gap-3 bg-mainColor p-3 text-white"
		>
			<div className="flex items-center w-32 lg:w-48 h-full lg:h-32">
				<img
					src={ImagePrincipal}
					alt={PRODUCT_NAME}
					className="w-full h-full object-cover bg-white"
				/>
			</div>
			<div className="flex flex-col w-28">
				<h4 className="font-bold text-base">{PRODUCT_NAME}</h4>
				<span className="before:content-['$'] text-sm">{PRECIO}</span>
			</div>
			<div className="flex flex-col">
				<span className="md:text-base text-sm font-medium">
					Talla: {SIZE_NAME}
				</span>
				<span className="md:text-base text-sm font-medium">
					Color: {COLOR_NAME}
				</span>
				<span className="md:text-base text-sm font-medium">
					Cantidad: {quantity}
				</span>
			</div>
		</div>
	);
}

export default function Summary() {
	const { cart, clearCart } = useCart();
	const queryString = window.location.search;

	const urlParams = new URLSearchParams(queryString);
	const token = urlParams.get("token_ws");

	const tbk_token = urlParams.get("TBK_TOKEN");
	const tbk_id_sesion = urlParams.get("TBK_ID_SESION");
	const tbk_orden_compra = urlParams.get("TBK_ORDEN_COMPRA");

	const [images, setImages] = useState([]);

	const URLIMG = "https://server.aquilabrand.cl/images";

	const Imagenes = async () => {
		fetch(URLIMG, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setImages(data);
			});
	};

	useEffect(() => {
		Imagenes();
		clearCart();
	}, []);

	let transaction_info;

	let transactionData;

	!tbk_token
		? (transaction_info = Webpay(token))
		: (transaction_info = Webpay(tbk_token));

	!tbk_token
		? (transactionData = obtenerDatos(token))
		: (transactionData = obtenerDatos(tbk_token));

	if (!transaction_info || !transactionData || !images[0])
		return (
			<div className="relative flex justify-center items-center w-screen h-screen">
				<TailSpin color="#e2fcef" height={80} width={80} />
			</div>
		);

	let count = 0;

	const info = JSON.parse(transactionData[0]["INFO"]);
	const infoProductos = info[0]["detalle_productos"];

	infoProductos.map((item) => (count = count + item.quantity));

	if (
		transaction_info.response_code === 0 &&
		transaction_info.status === "AUTHORIZED" &&
		tbk_token === null
	) {
		ActualizarEstado(transaction_info.status, token);
		let fecha = transaction_info.transaction_date.slice(0, -5).split("T");
		let cliente = JSON.parse(transactionData[0]["CLIENTE_INFO"]);
		let nombre_cliente = cliente.nombre.split(" ");
		return (
			<div className="flex top-20 w-screen justify-center items-center relative h-full mb-28 pb-28 md:pt-28">
				<div className="bg-white md:w-1/2 w-screen flex flex-col relative rounded-xl p-4">
					<img
						src={Check}
						alt="check"
						className="absolute right-1/2 left-1/2 -translate-x-1/2 inset-0 w-16"
					/>
					<div className="pt-16 text-center">
						<h1 className="font-bold text-2xl pb-4">
							¡Gracias por tu compra, {nombre_cliente[0]}!
						</h1>
					</div>
					<div id="info-transaccion" className="border-b-2 mb-2">
						<h1 className="font-bold text-xl">Detalle de transacción</h1>
						<h2 className="font-bold text-lg">
							Orden de compra:{" "}
							<span className="font-medium italic">
								{transaction_info.buy_order}
							</span>
						</h2>
						<h2 className="font-bold text-lg">
							Fecha de transacción:{" "}
							<span className="font-medium italic">
								{fecha[0] + " " + fecha[1]}
							</span>
						</h2>
						<h2 className="font-bold text-lg">
							Estado de la transacción:{" "}
							<span className="font-medium italic">
								{transaction_info.status === "AUTHORIZED"
									? "Exitosa"
									: transaction_info.status}
							</span>
						</h2>
						<h2 className="font-bold text-lg">
							Monto de la transacción:{" "}
							<span className="font-medium italic before:content-['$']">
								{transaction_info.amount}
							</span>
						</h2>
						<h2 className="font-bold text-lg">
							Tajeta:{" "}
							<span className="font-medium italic">
								{"**** **** **** " + transaction_info.card_detail.card_number}
							</span>
						</h2>
						<h2 className="font-bold text-lg">
							Código de autorización:{" "}
							<span className="font-medium italic">
								{transaction_info.authorization_code}
							</span>
						</h2>
					</div>
					<div id="info-productos" className="flex flex-col">
						<h1 className="font-bold text-xl pb-4">Detalle de productos</h1>
						<div className="md:h-40 lg:h-[20rem] overflow-y-auto flex flex-col items-center gap-3">
							{infoProductos.map((item) => (
								<Product_Card
									key={
										item.PRODUCT_ID +
										item.PRODUCT_NAME +
										item.COLOR_NAME +
										item.SIZE_NAME
									}
									{...item}
									image={images}
								/>
							))}
						</div>
						<div className="flex flex-col border-t-2 mt-2">
							<h4 className="flex justify-between text-xl font-bold">
								Cantidad de productos:
								<span className="font-medium">{count}</span>
							</h4>
							<h4 className="font-bold text-lg italic py-2">
								Nos pondremos en contacto con UD. para coordinar el envio
							</h4>
							<Link
								to="/"
								className=" text-center bg-black text-white w-full py-2 font-bold text-lg hover:bg-mainColor rounded-sm "
							>
								Volver al inicio
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	} else if (tbk_token) {
		ActualizarEstado("Aborted", tbk_token);
		//transaccion anulada o ha ocurrido un error
		return (
			<div className=" flex top-20 w-screen justify-center items-center relative h-full mb-28 pb-28 md:pt-28">
				<div className="bg-white md:w-1/2 w-screen flex flex-col relative rounded-xl p-4">
					<img
						src={Rejected}
						alt="check"
						className="absolute right-1/2 left-1/2 -translate-x-1/2 inset-0 w-16"
					/>
					<div className="pt-16 text-center  pb-4">
						<h1 className="font-bold text-2xl">
							¡Tu compra no ha sido realizada!
						</h1>
						<h2 className="font-bold text-2xl">
							No se ha realizado ningun cargo a tu tarjeta
						</h2>
					</div>

					<div id="info-transaccion" className="mb-2">
						<h1 className="font-bold text-xl">Detalle de transacción</h1>
						<h2 className="font-bold text-lg">
							Orden de compra:{" "}
							<span className="font-medium italic">{tbk_orden_compra}</span>
						</h2>
						<h2 className="font-bold text-lg">
							Sesion:{" "}
							<span className="font-medium italic">{tbk_id_sesion}</span>
						</h2>
						<h2 className="font-bold text-lg">
							Estado: <span className="font-medium italic">Aborted</span>
						</h2>
					</div>
					<Link
						to="/"
						className=" text-center bg-black text-white w-full py-2 font-bold text-lg hover:bg-mainColor rounded-sm "
					>
						Volver al inicio
					</Link>
				</div>
			</div>
		);
	} else {
		let fecha = transaction_info.transaction_date.slice(0, -5).split("T");
		ActualizarEstado(transaction_info.status, token);
		return (
			<div className="flex top-20 w-screen justify-center items-center relative h-full mb-28 pb-28 md:pt-28">
				<div className="bg-white md:w-1/2 w-screen flex flex-col relative rounded-xl p-4">
					<img
						src={Rejected}
						alt="check"
						className="absolute right-1/2 left-1/2 -translate-x-1/2 inset-0 w-16"
					/>
					<div className="pt-16 text-center pb-4">
						<h1 className="font-bold text-2xl ">
							¡Tu compra no ha sido realizada!
						</h1>
						<p>Ha ocurrido un error durante el pago</p>
					</div>
					<div id="info-transaccion" className="mb-2">
						<h1 className="font-bold text-xl">Detalle de transacción</h1>
						<h2 className="font-bold text-lg">
							Orden de compra:{" "}
							<span className="font-medium italic">
								{transaction_info.buy_order}
							</span>
						</h2>
						<h2 className="font-bold text-lg">
							Tajeta:{" "}
							<span className="font-medium italic">
								{"**** **** **** " + transaction_info.card_detail.card_number}
							</span>
						</h2>
						<h2 className="font-bold text-lg">
							Fecha y hora:{" "}
							<span className="font-medium italic">
								{fecha[0] + " " + fecha[1]}
							</span>
						</h2>
						<h2 className="font-bold text-lg">
							Estado de la transacción:{" "}
							<span className="font-medium italic">
								{transaction_info.status === "FAILED"
									? "Fallida"
									: transaction_info.status}
							</span>
						</h2>
						<h2 className="font-bold text-lg">
							Monto de la transacción:{" "}
							<span className="font-medium italic before:content-['$']">
								{transaction_info.amount}
							</span>
						</h2>
					</div>
					<div id="info-productos" className="flex flex-col">
						<div className="flex flex-col border-t-2 mt-2">
							<h4 className="font-bold text-lg italic py-2">
								Por favor, vuelve a intentarlo más tarde
							</h4>
							<Link
								to="/"
								className=" text-center bg-black text-white w-full py-2 font-bold text-lg hover:bg-mainColor rounded-sm "
							>
								Volver al inicio
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
