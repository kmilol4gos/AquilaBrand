import { useEffect, useState } from "react";
import { useCart } from "./hook/useCart";
import { Cart_Cantidad } from "./hook/datosCart";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Check from "./assets/circle-check-filled.svg";

function Webpay(token) {
	const URL = "http://localhost:3000/checkout";

	const [transaction_info, setTransaction_info] = useState();

	const fetchApi = async () => {
		const response = await fetch(URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
		});
		const responseJSON = await response.json();
		setTransaction_info(responseJSON);
	};

	useEffect(() => {
		fetchApi();
	}, []);

	return transaction_info;
}

function obtenerDatos(token) {
	const URL = "http://localhost:3000/transactions";

	const [transactionData, setTransactionData] = useState();

	const fetchApi = async () => {
		const response = await fetch(URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				token: token,
			},
		});
		const responseJSON = await response.json();
		setTransactionData(responseJSON);
	};

	useEffect(() => {
		fetchApi();
	}, []);

	return transactionData;
}

function Product_Card({
	PRODUCT_ID,
	PRODUCT_NAME,
	PRODUCT_DESCRIPTION,
	PRECIO,
	quantity,
	SIZE_NAME,
	COLOR_NAME,
}) {
	return (
		<div
			key={PRODUCT_ID}
			className="flex w-[90%] justify-around gap-3 bg-mainColor p-3 text-white"
		>
			<div className="flex items-center w-32  h-full">
				<img alt={PRODUCT_NAME} className="w-full h-full object-cover bg-white" />
			</div>
			<div className="flex flex-col w-28">
				<h4 className="font-bold text-base">{PRODUCT_NAME}</h4>
				<span className="before:content-['$'] text-sm">{PRECIO}</span>
			</div>
			<div className="flex flex-col">
				<span className="text-base font-medium">Talla: {SIZE_NAME}</span>
				<span className="text-base font-medium">Color: {COLOR_NAME}</span>
				<span className="text-base font-medium">Cantidad: {quantity}</span>
			</div>
		</div>
	);
}

export default function Summary() {
	const queryString = window.location.search;

	const urlParams = new URLSearchParams(queryString);
	const token = urlParams.get("token_ws");

	const transaction_info = Webpay(token);

	const transactionData = obtenerDatos(token);

	if (!transaction_info || !transactionData)
		return (
			<div className="relative flex justify-center items-center w-screen h-screen">
				<TailSpin color="#e2fcef" height={80} width={80} />
			</div>
		);

	const info = JSON.parse(transactionData[0]["INFO"]);
	const infoProductos = info[0]["detalle_productos"];

	let count = 0;

	infoProductos.map((item) => (count = count + item.quantity));

	return (
		<div className="flex w-screen justify-center items-center relative h-screen mb-28 pt-28">
			<div className="bg-white w-1/2 flex flex-col relative rounded-xl p-4">
				<img
					src={Check}
					alt="check"
					className="absolute right-1/2 left-1/2 -translate-x-1/2 inset-0 w-16"
				/>
				<div className="pt-16 text-center">
					<h1 className="font-bold text-2xl pb-4">¡Gracias por tu compra!</h1>
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
							{transaction_info.transaction_date}
						</span>
					</h2>
					<h2 className="font-bold text-lg">
						Estado de la transacción:{" "}
						<span className="font-medium italic">
							{transaction_info.status}
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
					<h1 className="font-bold text-xl pb-4">Detalle de productos</h1>
					<div className="h-[20rem] overflow-y-auto flex flex-col items-center gap-3">
						{infoProductos.map((item) => (
							<Product_Card
								key={item.PRODUCT_ID + item.PRODUCT_NAME + item.COLOR_NAME}
								{...item}
							/>
						))}
					</div>
					<div className="flex flex-col border-t-2 mt-2">
						<h4 className="flex justify-between text-xl font-bold">
							Cantidad de productos:<span className="font-medium">{count}</span>
						</h4>
						<h4 className="font-bold text-lg italic py-2">Nos pondremos en contacto con UD. para coordinar el envio</h4>
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
