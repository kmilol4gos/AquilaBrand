import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Events() {
	const URL = "http://localhost:3000/event";

	const [events, setEvents] = useState();

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

	const [currentEventIndex, setCurrentEventIndex] = useState(0);
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

	return (
		<div id="event-card" className="text-white">
			<div className="flex">
				{!events
					? "Cargando..."
					: events.map((event, index) => {
							return (
								<motion.div
									key={event.EVENT_ID}
									className="w-[80%] flex justify-center h-[30rem] relative"
								>
									<img
										src=""
										alt={event.EVENT_NAME}
										className="w-full h-full object-cover bg-mainColor"
									/>
									<section
										id="titulo-evento"
										className="absolute w-full bottom-0 flex flex-col backdrop-blur-md text-white h-auto justify-around"
									>
										<h1 className="font-bold text-2xl p-2 uppercase">
											{event.EVENT_NAME}
										</h1>
										<p className="font-bold text-base p-2">
											{event.EVENT_DESCRIPTION}
										</p>
										<p> {event.EVENT_ADDRESS}</p>
										<p> {event.EVENT_DATE}</p>
										<p> {event.EVENT_TIME}</p>
									</section>
								</motion.div>
							);
					  })}
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
