import { useState, useEffect } from "react";
import { useCart } from "./hook/useCart";
import { Cart_Amount, Cart_Cantidad } from "./hook/datosCart";
import { TailSpin } from "react-loader-spinner";

//pagina de confirmacion de compra

//llamar a webpay luego de confirmar compra.

//aca ya llega el carro definitivo para la compra.

//aca se pide la informacion de la cliente.

const RegionesYcomunas = {
	regiones: [
		{
			NombreRegion: "Arica y Parinacota",
			comunas: ["Arica", "Camarones", "Putre", "General Lagos"],
		},
		{
			NombreRegion: "Tarapacá",
			comunas: [
				"Iquique",
				"Alto Hospicio",
				"Pozo Almonte",
				"Camiña",
				"Colchane",
				"Huara",
				"Pica",
			],
		},
		{
			NombreRegion: "Antofagasta",
			comunas: [
				"Antofagasta",
				"Mejillones",
				"Sierra Gorda",
				"Taltal",
				"Calama",
				"Ollagüe",
				"San Pedro de Atacama",
				"Tocopilla",
				"María Elena",
			],
		},
		{
			NombreRegion: "Atacama",
			comunas: [
				"Copiapó",
				"Caldera",
				"Tierra Amarilla",
				"Chañaral",
				"Diego de Almagro",
				"Vallenar",
				"Alto del Carmen",
				"Freirina",
				"Huasco",
			],
		},
		{
			NombreRegion: "Coquimbo",
			comunas: [
				"La Serena",
				"Coquimbo",
				"Andacollo",
				"La Higuera",
				"Paiguano",
				"Vicuña",
				"Illapel",
				"Canela",
				"Los Vilos",
				"Salamanca",
				"Ovalle",
				"Combarbalá",
				"Monte Patria",
				"Punitaqui",
				"Río Hurtado",
			],
		},
		{
			NombreRegion: "Valparaíso",
			comunas: [
				"Valparaíso",
				"Casablanca",
				"Concón",
				"Juan Fernández",
				"Puchuncaví",
				"Quintero",
				"Viña del Mar",
				"Isla de Pascua",
				"Los Andes",
				"Calle Larga",
				"Rinconada",
				"San Esteban",
				"La Ligua",
				"Cabildo",
				"Papudo",
				"Petorca",
				"Zapallar",
				"Quillota",
				"Calera",
				"Hijuelas",
				"La Cruz",
				"Nogales",
				"San Antonio",
				"Algarrobo",
				"Cartagena",
				"El Quisco",
				"El Tabo",
				"Santo Domingo",
				"San Felipe",
				"Catemu",
				"Llaillay",
				"Panquehue",
				"Putaendo",
				"Santa María",
				"Quilpué",
				"Limache",
				"Olmué",
				"Villa Alemana",
			],
		},
		{
			NombreRegion: "Región del Libertador Gral. Bernardo O’Higgins",
			comunas: [
				"Rancagua",
				"Codegua",
				"Coinco",
				"Coltauco",
				"Doñihue",
				"Graneros",
				"Las Cabras",
				"Machalí",
				"Malloa",
				"Mostazal",
				"Olivar",
				"Peumo",
				"Pichidegua",
				"Quinta de Tilcoco",
				"Rengo",
				"Requínoa",
				"San Vicente",
				"Pichilemu",
				"La Estrella",
				"Litueche",
				"Marchihue",
				"Navidad",
				"Paredones",
				"San Fernando",
				"Chépica",
				"Chimbarongo",
				"Lolol",
				"Nancagua",
				"Palmilla",
				"Peralillo",
				"Placilla",
				"Pumanque",
				"Santa Cruz",
			],
		},
		{
			NombreRegion: "Región del Maule",
			comunas: [
				"Talca",
				"ConsVtución",
				"Curepto",
				"Empedrado",
				"Maule",
				"Pelarco",
				"Pencahue",
				"Río Claro",
				"San Clemente",
				"San Rafael",
				"Cauquenes",
				"Chanco",
				"Pelluhue",
				"Curicó",
				"Hualañé",
				"Licantén",
				"Molina",
				"Rauco",
				"Romeral",
				"Sagrada Familia",
				"Teno",
				"Vichuquén",
				"Linares",
				"Colbún",
				"Longaví",
				"Parral",
				"ReVro",
				"San Javier",
				"Villa Alegre",
				"Yerbas Buenas",
			],
		},
		{
			NombreRegion: "Region del Ñuble",
			comunas: [
				"Cobquecura",
				"Coelemu",
				"Ninhue",
				"Portezuelo",
				"Quirihue",
				"Ránquil",
				"Trehauco",
				"Bulnes",
				"Chillán Viejo",
				"Chillán",
				"El Carmen",
				"Pemuco",
				"Pinto",
				"Quillón",
				"San Ignacio",
				"Yungay",
				"Coihueco",
				"Ñiquén",
				"San Carlos",
				"San Fabian",
				"San Nicolás",
			],
		},
		{
			NombreRegion: "Región del Biobío",
			comunas: [
				"Concepción",
				"Coronel",
				"Chiguayante",
				"Florida",
				"Hualqui",
				"Lota",
				"Penco",
				"San Pedro de la Paz",
				"Santa Juana",
				"Talcahuano",
				"Tomé",
				"Hualpén",
				"Lebu",
				"Arauco",
				"Cañete",
				"Contulmo",
				"Curanilahue",
				"Los Álamos",
				"Tirúa",
				"Los Ángeles",
				"Antuco",
				"Cabrero",
				"Laja",
				"Mulchén",
				"Nacimiento",
				"Negrete",
				"Quilaco",
				"Quilleco",
				"San Rosendo",
				"Santa Bárbara",
				"Tucapel",
				"Yumbel",
				"Alto Biobío",
			],
		},
		{
			NombreRegion: "Región de la Araucanía",
			comunas: [
				"Temuco",
				"Carahue",
				"Cunco",
				"Curarrehue",
				"Freire",
				"Galvarino",
				"Gorbea",
				"Lautaro",
				"Loncoche",
				"Melipeuco",
				"Nueva Imperial",
				"Padre las Casas",
				"Perquenco",
				"Pitrufquén",
				"Pucón",
				"Saavedra",
				"Teodoro Schmidt",
				"Toltén",
				"Vilcún",
				"Villarrica",
				"Cholchol",
				"Angol",
				"Collipulli",
				"Curacautín",
				"Ercilla",
				"Lonquimay",
				"Los Sauces",
				"Lumaco",
				"Purén",
				"Renaico",
				"Traiguén",
				"Victoria",
			],
		},
		{
			NombreRegion: "Región de Los Ríos",
			comunas: [
				"Valdivia",
				"Corral",
				"Lanco",
				"Los Lagos",
				"Máfil",
				"Mariquina",
				"Paillaco",
				"Panguipulli",
				"La Unión",
				"Futrono",
				"Lago Ranco",
				"Río Bueno",
			],
		},
		{
			NombreRegion: "Región de Los Lagos",
			comunas: [
				"Puerto Montt",
				"Calbuco",
				"Cochamó",
				"Fresia",
				"FruVllar",
				"Los Muermos",
				"Llanquihue",
				"Maullín",
				"Puerto Varas",
				"Castro",
				"Ancud",
				"Chonchi",
				"Curaco de Vélez",
				"Dalcahue",
				"Puqueldón",
				"Queilén",
				"Quellón",
				"Quemchi",
				"Quinchao",
				"Osorno",
				"Puerto Octay",
				"Purranque",
				"Puyehue",
				"Río Negro",
				"San Juan de la Costa",
				"San Pablo",
				"Chaitén",
				"Futaleufú",
				"Hualaihué",
				"Palena",
			],
		},
		{
			NombreRegion: "Región Asén del Gral. Carlos Ibáñez del Campo",
			comunas: [
				"Coihaique",
				"Lago Verde",
				"Aisén",
				"Cisnes",
				"Guaitecas",
				"Cochrane",
				"O’Higgins",
				"Tortel",
				"Chile Chico",
				"Río Ibáñez",
			],
		},
		{
			NombreRegion: "Región de Magallanes y de la Antárica Chilena",
			comunas: [
				"Punta Arenas",
				"Laguna Blanca",
				"Río Verde",
				"San Gregorio",
				"Cabo de Hornos (Ex Navarino)",
				"AntárVca",
				"Porvenir",
				"Primavera",
				"Timaukel",
				"Natales",
				"Torres del Paine",
			],
		},
		{
			NombreRegion: "Región Metropolitana de Santiago",
			comunas: [
				"Cerrillos",
				"Cerro Navia",
				"Conchalí",
				"El Bosque",
				"Estación Central",
				"Huechuraba",
				"Independencia",
				"La Cisterna",
				"La Florida",
				"La Granja",
				"La Pintana",
				"La Reina",
				"Las Condes",
				"Lo Barnechea",
				"Lo Espejo",
				"Lo Prado",
				"Macul",
				"Maipú",
				"Ñuñoa",
				"Pedro Aguirre Cerda",
				"Peñalolén",
				"Providencia",
				"Pudahuel",
				"Quilicura",
				"Quinta Normal",
				"Recoleta",
				"Renca",
				"San Joaquín",
				"San Miguel",
				"San Ramón",
				"Vitacura",
				"Puente Alto",
				"Pirque",
				"San José de Maipo",
				"Colina",
				"Lampa",
				"TilVl",
				"San Bernardo",
				"Buin",
				"Calera de Tango",
				"Paine",
				"Melipilla",
				"Alhué",
				"Curacaví",
				"María Pinto",
				"San Pedro",
				"Talagante",
				"El Monte",
				"Isla de Maipo",
				"Padre Hurtado",
				"Peñaflor",
			],
		},
		// Resto de regiones...
	],
};

const App = () => {
	const [selectedRegion, setSelectedRegion] = useState("");
	const [selectedComuna, setSelectedComuna] = useState("");

	const handleRegionChange = (e) => {
		const selectedRegion = e.target.value;
		setSelectedRegion(selectedRegion);
		setSelectedComuna(""); // Reset selected comuna
	};

	const handleComunaChange = (e) => {
		const selectedComuna = e.target.value;
		setSelectedComuna(selectedComuna);
	};

	return (
		<div className="flex flex-col gap-4">
			<select
				className="bg-white p-2 text-black rounded-sm"
				value={selectedRegion}
				onChange={handleRegionChange}
			>
				<option value="">Seleccione región</option>
				{RegionesYcomunas.regiones.map((region) => (
					<option key={region.NombreRegion} value={region.NombreRegion}>
						{region.NombreRegion}
					</option>
				))}
			</select>
			<select
				className="bg-white p-2 text-black rounded-sm"
				value={selectedComuna}
				onChange={handleComunaChange}
			>
				<option value="">Seleccione comuna</option>
				{selectedRegion &&
					RegionesYcomunas.regiones
						.find((region) => region.NombreRegion === selectedRegion)
						.comunas.map((comuna) => (
							<option key={comuna} value={comuna}>
								{comuna}
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
			className="flex justify-around items-center relative h-screen"
			id="redireccion webpay"
		>
			<div className="flex flex-col items-center">
				<h1 className="text-3xl mb-14 relative text-white">
					Informacion personal
				</h1>
				<form className="flex flex-col gap-4">
					<div className=" rounded-sm flex items-center bg-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-user ml-3"
							width="32"
							height="32"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="#9B287B"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
							<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
						</svg>
						<input
							type="text"
							name="name"
							placeholder="Nombre"
							className="bg-transparent w-full p-2 placeholder:text-bgColor outline-none border-none"
						/>
					</div>
					<label className=" bg-white rounded-sm flex items-center ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-user ml-3"
							width="32"
							height="32"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="#9B287B"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
							<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
						</svg>
						<input
							type="text"
							name="lastname"
							placeholder="Apellido"
							className="bg-transparent w-full p-2 placeholder:text-bgColor outline-none border-none"
						/>
					</label>
					<label className=" rounded-sm flex items-center bg-white ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-mail ml-3"
							width="32"
							height="32"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="#9B287B"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
							<path d="M3 7l9 6l9 -6" />
						</svg>
						<input
							type="email"
							name="email"
							placeholder="Correo"
							className="bg-transparent w-full p-2 placeholder:text-bgColor outline-none border-none"
						/>
					</label>
					<label className=" rounded-sm flex items-center bg-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-device-mobile ml-3"
							width="32"
							height="32"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="#9B287B"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z" />
							<path d="M11 4h2" />
							<path d="M12 17v.01" />
						</svg>
						<input
							type="text"
							name="phone"
							placeholder="Celular"
							className="bg-transparent w-full p-2 placeholder:text-bgColor text-black outline-none border-none"
						/>
					</label>
					<label className="rounded-sm flex items-center bg-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-home-2 ml-3"
							width="32"
							height="32"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="#9B287B"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M5 12l-2 0l9 -9l9 9l-2 0" />
							<path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
							<path d="M10 12h4v4h-4z" />
						</svg>
						<input
							type="text"
							name="address"
							placeholder="Direccion"
							className="bg-transparent w-full p-2 placeholder:text-bgColor outline-none border-none"
						/>
					</label>
					<App />
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
