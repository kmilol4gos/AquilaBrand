import { useState, useEffect } from "react";
import { useCart } from "./hook/useCart";
import { Cart_Amount, Cart_Cantidad } from "./hook/datosCart";
import { TailSpin } from "react-loader-spinner";
import PersonIcon from "./assets/PersonIcon.svg";
import EmailIcon from "./assets/EmailIcon.svg";
import CellIcon from "./assets/CellIcon.svg";
import HomeIcon from "./assets/HomeIcon.svg";

//pagina de confirmacion de compra

//llamar a webpay luego de confirmar compra.

//aca ya llega el carro definitivo para la compra.

//aca se pide la informacion de la cliente.

function GuardarDatos({
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
}){
	console.log(cart)
	console.log(order_id)
	console.log(session_id)
	console.log(amount)
	console.log(quantity)
	console.log(region)
	console.log(comuna)
	console.log(address)
	console.log(nombre)
	console.log(apellido)
	console.log(email)
	console.log(telefono)


	const informacionCliente = ({

	})

	return (
		alert("Datos guardados")
	)
}

const App = ({selectedRegion, setSelectedRegion, selectedComuna, setSelectedComuna}) => {
	//const [selectedRegion, setSelectedRegion] = useState("");
	//const [selectedComuna, setSelectedComuna] = useState("");

	const [comunas, setComunas] = useState([]);
	const [regiones, setRegiones] = useState([]);

	const fetchApi = async () => {
		const response = await fetch(
			"http://localhost:3000/region"
		);
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

	if(!regiones){
		return <h1>Cargando...</h1>
	}
	newState = comunas.filter((item) => item.REGION_NOMBRE === selectedRegion)

	return (
		<div className="flex flex-col gap-4">
			<select
				className="bg-white p-2 text-black rounded-sm outline-none border-none"
				value={selectedRegion}
				onChange={handleRegionChange}
			>
				<option value="">Seleccione región</option>
				{regiones.map((region) => (
					<option key={region.REGION_NOMBRE} value={region.REGION_NOMBRE}>
						{region.REGION_NOMBRE}
					</option>
				))}
			</select>
			<select
				className="bg-white p-2 text-black rounded-sm outline-none border-none"
				value={selectedComuna}
				onChange={handleComunaChange}
			>
				<option value="">Seleccione comuna</option>
				{
					newState.map((comuna) => (
						<option key={comuna.COMUNA_NOMBRE} value={comuna.COMUNA_NOMBRE}>
							{comuna.COMUNA_NOMBRE}
						</option>
					))}
			</select>
			{/* <button
				onClick={() => {
					if (!selectedRegion) {
						alert("Seleccione Región");
					} else if (!selectedComuna) {
						alert("Seleccione Comuna");
					}
				}}
			>
				Validar selección
			</button> */}
		</div>
	);
};

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
	COLOR_NAME,
	images
}) {

	let ImagePrincipal = [];
	const filterImages = images.filter((item) => 
		item.COLOR_NAME === COLOR_NAME && item.PRODUCT_ID === PRODUCT_ID );
		if(!filterImages[0]){
	}
	else{
		ImagePrincipal = filterImages[0].IMAGE;
	}
	return (
		<div
			key={PRODUCT_NAME}
			className="bg-mainColor flex justify-between p-5 text-white"
		>
			<div className="bg-white flex items-center w-[15%]">
				<img alt={PRODUCT_NAME} src={ImagePrincipal} className="w-full object-cover" />
			</div>
			<div className="flex flex-col">
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

	const [selectedRegion, setSelectedRegion] = useState("");
	const [selectedComuna, setSelectedComuna] = useState("");
	const [Address, setAddress] = useState("");
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [email, setEmail] = useState("");
	const [telefono, setTelefono] = useState("");

	const [images, setImages] = useState([]);

	const URLIMG = "http://localhost:3000/images";

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

	return (
		<div
			className="flex items-center justify-around relative h-screen w-screen "
			id="redireccion webpay"
		>
			<div className="flex flex-col items-center relative " id="info-personal ">
				<h1 className="text-3xl mb-14  text-white">Informacion personal</h1>
				<div
					className="flex flex-col gap-4" 
				>
					<div className=" rounded-sm flex items-center bg-white">
						<img src={PersonIcon} alt="" className="ml-3" />
						<input
							type="text"
							name="name"
							onChange={namehandleChange}
							placeholder="Nombre"
							className="bg-transparent w-full p-2 placeholder:text-bgColor outline-none border-none "
						/>
					</div>
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
							onChange={emailhandleChange}
							placeholder="Correo"
							className="bg-transparent w-full p-2 placeholder:text-bgColor outline-none border-none"
							required
						/>
					</label>
					<label className=" rounded-sm flex items-center bg-white">
						<img src={CellIcon} alt="" className="ml-3" />
						<input
							type="text"
							name="phone"
							onChange={phonehandleChange}
							placeholder="Celular"
							className="bg-transparent w-full p-2 placeholder:text-bgColor text-black outline-none border-none"
							required
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
						onClick={() => {GuardarDatos( cart, order_id, session_id, <Cart_Amount/>, <Cart_Cantidad/>, selectedRegion, selectedComuna, Address, nombre, apellido, email, telefono)}}
						value="Confirmar Datos"
						className="bg-black text-white py-2 font-bold text-lg hover:bg-white hover:text-black cursor-pointer rounded-sm"
					>Confirmar Datos</button>
				</div>
			</div>

			<div
				className="border-l-2 flex items-center flex-col justify-center text-white relative px-7"
				id="resumen-productos"
			>
				<h1 className="text-3xl mb-14">Resumen de la compra</h1>
				<div className="h-[23rem] overflow-y-auto flex flex-col gap-3">
					{cart.map((item) => (
						<Product_Card 
							key={item.PRODUCT_NAME} 
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
				<form className="flex flex-col gap-4" action={info.url} method="post">
				<input type="hidden" name="token_ws" value={info.token} />
					<input
						type="submit"
						value="Ir a pagar"
						className="bg-black text-white py-2 font-bold text-lg hover:bg-white hover:text-black cursor-pointer rounded-sm"
					/>
				</form>
				
			</div>
		</div>
	);
}
