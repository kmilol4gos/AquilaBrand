import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TailSpin } from "react-loader-spinner";
import ArrowRight from "./assets/ArrowRight.svg";
import ArrowLeft from "./assets/ArrowLeft.svg";

function MostrarEvento(events, currentEventIndex) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			key={events[currentEventIndex].EVENT_ID}
			className="w-60 md:w-[55rem] h-[25rem] flex items-center relative"
		>
			<img
				src={events[currentEventIndex].EVENT_IMAGE}
				alt={events[currentEventIndex].EVENT_NAME}
				className="w-full h-full object-cover"
			/>
			<section
				id="titulo-evento"
				className="absolute w-full bottom-0 flex flex-col backdrop-blur-md text-white h-auto justify-around"
			>
				<h1 className="font-bold text-2xl p-2 uppercase">
					{events[currentEventIndex].EVENT_NAME}
				</h1>
				<p className="font-bold text-base px-2 italic">
					<span>Direccion:</span> {events[currentEventIndex].EVENT_ADDRESS}
				</p>
				<p className="font-bold text-base px-2 italic">
					<span>Fecha:</span> {events[currentEventIndex].EVENT_DATE}
				</p>
				<p className="font-bold text-base px-2 italic">
					<span>Hora de inicio:</span> {events[currentEventIndex].EVENT_TIME}
				</p>
			</section>
		</motion.div>
	);
}

function Events() {
	const URL = "http://server.aquilabrand.cl/event";

	const [events, setEvents] = useState();
	const [currentEventIndex, setCurrentEventIndex] = useState(0);

	const fetchApi = async () => {
		const response = await fetch(URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const responseJSON = await response.json();
		setEvents(responseJSON);
	};

	useEffect(() => {
		fetchApi();
	}, []);

	if (!events) {
		return (
			<div className="flex justify-center items-center w-screen h-screen">
				<TailSpin color="#e2fcef" height={80} width={80} />
			</div>
		);
	}

	const handlePrevClick = () => {
		setCurrentEventIndex((prevIndex) =>
			prevIndex === 0 ? events.length - 1 : prevIndex - 1
		);
	};
	const handleNextClick = () => {
		setCurrentEventIndex((prevIndex) =>
			prevIndex === events.length - 1 ? 0 : prevIndex + 1
		);
	};

	console.log(events);
	console.log(currentEventIndex);
	console.log(events[currentEventIndex]);

	return (
		<div id="event-card" className="text-white relative">
			<div className="flex justify-center items-center">
				<button className="" onClick={handlePrevClick}>
					<img src={ArrowLeft} alt="" />
				</button>
				{!events ? "Cargando..." : MostrarEvento(events, currentEventIndex)}
				<button className="" onClick={handleNextClick}>
					<img src={ArrowRight} alt="" />
				</button>
			</div>
		</div>
	);
}

export default Events;
/*

webpay // importante
carro compras //importante
eventos //importante (listo)
productos destacados (cambiar parametros base de datos, agregar tabla producto destacado) //importante (listo)
funcionalidad botones carro de compra //importante (despues de implementar carro de compras)
productos por categoria o seccion (listo)
informacion //prioridad baja
whatsapp //prioridad baja
pagina de confirmacion de compra //importante (pendiente de carro de compras)
pagina pa que pueda cambiar los productos //prioridad baja (al ultimo)


carro de compras:

Json con:

1. orden compra (numero generado aleatorio que no se repita.)
2. productos (id de inventario, porque estos contienen la talla el color)
    1. id de inventario (para descontar del inventario)
    2. cantidad
    3. precio unitario
    4. id producto
    5. color
    6. talla
3. total (suma de todos los productos)
4. fecha de compra (fecha en que se realizo la compra)
*/
