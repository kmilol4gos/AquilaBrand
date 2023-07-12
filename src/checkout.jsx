import { useState, useEffect } from "react";
import { useCart } from "./hook/useCart";
import { Cart_Amount, Cart_Cantidad } from "./hook/datosCart";
import { TailSpin } from "react-loader-spinner";
import { motion } from "framer-motion";
import PersonIcon from "./assets/PersonIcon.svg";
import EmailIcon from "./assets/EmailIcon.svg";
import CellIcon from "./assets/CellIcon.svg";
import HomeIcon from "./assets/HomeIcon.svg";

function GuardarDatos(
	cart,
	order_id,
	session_id,
	amount,
	quantity,
	region,
	comuna,
	address,
	nombre,
	apellido,
	email,
	telefono,
	token
) {
	if (
		nombre === undefined ||
		apellido === undefined ||
		email === undefined ||
		telefono === undefined ||
		region === undefined ||
		comuna === undefined ||
		address === undefined
	) {
		alert("Revise la informacion ingresada");
		return;
	}
	const informacionCliente = {
		nombre: nombre + " " + apellido,
		email: email,
		telefono: telefono,
		direccion: address + ", " + comuna + ", " + region,
	};

	const informacionCompra = [
		{
			orden: order_id,
			sesion: session_id,
			monto: amount,
			cantidad: quantity,
			detalle_productos: cart,
		},
	];

	const URL = "https://server.aquilabrand.cl/transactions";

	const response = fetch(
		URL + "?" + new URLSearchParams({ token: token, estado: "pendiente" }),
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				cliente: informacionCliente,
				bolsa: informacionCompra,
			}),
		}
	);
	response;

	let formulario = document.getElementById("pago");

	setTimeout(() => {
		formulario.submit();
	}, 1500);
}

const App = ({
	selectedRegion,
	setSelectedRegion,
	selectedComuna,
	setSelectedComuna,
}) => {
	const [comunas, setComunas] = useState([]);
	const [regiones, setRegiones] = useState([]);

	const fetchApi = async () => {
		const response = await fetch("https://server.aquilabrand.cl/region");
		const data = await response.json();
		setRegiones(data[1]);
		setComunas(data[0]);
	};

	useEffect(() => {
		fetchApi();
	}, []);

	const handleRegionChange = (e) => {
		const selectedRegion = e.target.value;
		setSelectedRegion(selectedRegion);
		setSelectedComuna("");
	};

	const handleComunaChange = (e) => {
		const selectedComuna = e.target.value;
		setSelectedComuna(selectedComuna);
	};

	let newState = [];

	if (!regiones) {
		return <h1>Cargando...</h1>;
	}
	newState = comunas.filter((item) => item.REGION_NAME === selectedRegion);

	return (
		<label className="flex flex-col gap-4">
			<select
				className="bg-white p-2 text-black rounded-sm outline-none border-none"
				value={selectedRegion}
				onChange={handleRegionChange}
			>
				<option value="">Seleccione región</option>
				{regiones.map((region) => (
					<option key={region.REGION_NAME} value={region.REGION_NAME}>
						{region.REGION_NAME}
					</option>
				))}
			</select>
			<select
				className="bg-white p-2 text-black rounded-sm outline-none border-none"
				value={selectedComuna}
				onChange={handleComunaChange}
			>
				<option value="">Seleccione comuna</option>
				{newState.map((comuna) => (
					<option key={comuna.COMUNA_NAME} value={comuna.COMUNA_NAME}>
						{comuna.COMUNA_NAME}
					</option>
				))}
			</select>
		</label>
	);
};

function Webpay(order_id, session_id, amount) {
	const URL = "https://server.aquilabrand.cl/checkout";

	const [retorno, setRetorno] = useState();

	const fetchApi = async () => {
		const response = await fetch(URL, {
			method: "POST",
			body: JSON.stringify({
				buy_order: order_id,
				session_id: session_id,
				amount: amount,
				return_url: "https://aquilabrand.cl/summary",
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
	COLOR_NAME,
	images,
}) {
	let ImagePrincipal = [];
	const filterImages = images.filter(
		(item) => item.COLOR_NAME === COLOR_NAME && item.PRODUCT_ID === PRODUCT_ID
	);
	if (!filterImages[0]) {
	} else {
		ImagePrincipal = filterImages[0].IMAGE;
	}
	return (
		<div
			key={PRODUCT_NAME + COLOR_NAME + SIZE_NAME}
			className="w-full h-auto md:h-28 flex gap-3 bg-mainColor p-3"
		>
			<div className="flex items-center w-20 h-20 md:h-full">
				<img
					alt={PRODUCT_NAME}
					src={ImagePrincipal}
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="flex flex-col">
				<h4 className="font-bold text-base">{PRODUCT_NAME}</h4>
				<span className="before:content-['$'] text-sm">{PRECIO}</span>
			</div>
			<div className="flex flex-col">
				<span className="text-sm font-medium">Talla: {SIZE_NAME}</span>
				<span className="text-sm font-medium">Color: {COLOR_NAME}</span>
				<span className="text-sm font-medium">Cantidad: {quantity}</span>
			</div>
		</div>
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

	const amount = Cart_Amount();
	const quantity = Cart_Cantidad();

	const order_id = "Aquila_" + dia + mes + año + hora + minuto + segundo;
	const session_id =
		"AquilaSession_" + dia + mes + año + hora + minuto + segundo;

	const info = Webpay(order_id, session_id, Cart_Amount());

	const [selectedRegion, setSelectedRegion] = useState();
	const [selectedComuna, setSelectedComuna] = useState();
	const [Address, setAddress] = useState();
	const [nombre, setNombre] = useState();
	const [apellido, setApellido] = useState();
	const [email, setEmail] = useState();
	const [telefono, setTelefono] = useState();

	const [images, setImages] = useState([]);

	const URLIMG = "https://server.aquilabrand.cl/images";

	const Imagenes = async () => {
		const response = await fetch(URLIMG, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const responseJSON = await response.json();
		setImages(responseJSON);
	};

	useEffect(() => {
		Imagenes();
	}, []);

	const namehandleChange = (e) => {
		setNombre(e.target.value);
	};
	const lastnamehandleChange = (e) => {
		setApellido(e.target.value);
	};
	const emailhandleChange = (e) => {
		setEmail(e.target.value);
	};
	const phonehandleChange = (e) => {
		setTelefono(e.target.value);
	};
	const addresshandleChange = (e) => {
		setAddress(e.target.value);
	};

	if (!info || !images[0])
		return (
			<div className="relative flex justify-center items-center w-screen h-screen">
				<TailSpin color="#e2fcef" height={80} width={80} />
			</div>
		);

	// const form = document.getElementById("form-info-personal");
	// const input = document.getElementById("btn-pagar");
	// const popUp = document.getElementById("required");

	return (
		<div
			className=" flex flex-col-reverse md:flex-row items-center justify-around relative h-full top-20 md:h-screen md:top-0 w-screen gap-6 md:gap-0 mb-44 md:mb-20"
			id="redireccion webpay"
		>
			<div
				className="flex flex-col justify-center items-center h-full relative "
				id="info-personal "
			>
				<h1 className="text-3xl mb-14  text-white">Informacion personal</h1>
				<form className="flex flex-col gap-4" id="form-info-personal">
					<label className=" rounded-sm flex items-center bg-white">
						<img src={PersonIcon} alt="" className="ml-3" />
						<input
							type="text"
							name="name"
							required
							onChange={namehandleChange}
							placeholder="Nombre"
							className="bg-transparent w-full p-2 placeholder:text-bgColor outline-none border-none "
						/>
					</label>
					<label className=" bg-white rounded-sm flex items-center  ">
						<img src={PersonIcon} alt="" className="ml-3" />
						<input
							type="text"
							name="lastname"
							onChange={lastnamehandleChange}
							placeholder="Apellido"
							className="bg-transparent w-full p-2 placeholder:text-bgColor outline-none border-none"
							required
						/>
					</label>
					<label className=" rounded-sm flex items-center bg-white ">
						<img src={EmailIcon} alt="" className="ml-3" />
						<input
							type="email"
							name="email"
							required
							onChange={emailhandleChange}
							placeholder="Correo"
							className="bg-transparent w-full p-2 placeholder:text-bgColor outline-none border-none"
						/>
					</label>
					<label className=" rounded-sm flex items-center bg-white">
						<img src={CellIcon} alt="" className="ml-3" />
						<input
							type="text"
							name="phone"
							required
							onChange={phonehandleChange}
							placeholder="Celular ej: 912345678"
							className="bg-transparent w-full p-2 placeholder:text-bgColor text-black outline-none border-none"
						/>
					</label>
					<label className="rounded-sm flex items-center bg-white">
						<img src={HomeIcon} alt="" className="ml-3" />
						<input
							type="text"
							name="address"
							placeholder="Direccion"
							onChange={addresshandleChange}
							className="bg-transparent w-full p-2 placeholder:text-bgColor outline-none border-none"
							required
						/>
					</label>
					<App
						setSelectedRegion={setSelectedRegion}
						setSelectedComuna={setSelectedComuna}
						selectedComuna={selectedComuna}
						selectedRegion={selectedRegion}
					/>
					<button
						type="submit"
						onClick={(e) => {
							document
								.getElementById("form-info-personal")
								.addEventListener("submit", function (e) {
									e.preventDefault();
									GuardarDatos(
										cart,
										order_id,
										session_id,
										amount,
										quantity,
										selectedRegion,
										selectedComuna,
										Address,
										nombre,
										apellido,
										email,
										telefono,
										info.token
									);
								});
						}}
						id="btn-pagar"
						className="bg-black  text-white py-2 font-bold text-lg hover:bg-white hover:text-black cursor-pointer rounded-sm"
					>
						Ir a pagar
					</button>
				</form>
				{/* <motion.div
					className="bg-mainColor absolute"
					id="required"
					initial={{ opacity: 0, y: 300, x: 0 }}
					animate={{ opacity: 1, y: 300, x: 0 }}
					transition={{ duration: 0.3 }}
				>
					<h1 className="text-white p-4">Debe rellenar todos los campos</h1>
				</motion.div> */}
			</div>

			<div
				className="flex flex-col justify-center items-center h-full relative text-white mt-40 md:mt-0"
				id="resumen-productos"
			>
				<h1 className="text-3xl mb-14">Resumen de la compra</h1>
				<div className="h-[20.5rem] overflow-y-auto flex flex-col items-center gap-3">
					{cart.map((item) => (
						<Product_Card
							key={item.PRODUCT_NAME + item.COLOR_NAME + item.SIZE_NAME}
							{...item}
							images={images}
						/>
					))}
				</div>
				<div className="flex justify-between items-center w-full">
					<h4 className="text-xl font-bold">Productos:</h4>
					<span className="text-base font-medium">{<Cart_Cantidad />}</span>
				</div>
				<div className="flex justify-between items-center w-full">
					<h4 className="text-xl font-bold">Total:</h4>
					<span className="before:content-['$'] text-base font-medium">
						{<Cart_Amount />}
					</span>
				</div>
				<form id="pago" className="w-full" action={info.url} method="post">
					<input type="hidden" name="token_ws" value={info.token} />
				</form>
			</div>
			<div className="absolute top-0 md:top-20 w-full text-center">
				<p className="font-bold text-2xl text-white">
					Para el <span className="text-[#ff0000]">envio</span>, el vendedor se
					pondra en contacto con UD. despues de la compra, ya que son productos
					a pedido.
				</p>
			</div>
		</div>
	);
}
