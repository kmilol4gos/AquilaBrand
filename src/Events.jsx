import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TailSpin } from "react-loader-spinner";
import ArrowRight from "./assets/ArrowRight.svg";
import ArrowLeft from "./assets/ArrowLeft.svg";

function MostrarEvento(events, currentEventIndex) {
	let fecha = events[currentEventIndex].EVENT_DATE.slice(0, -5).split("T")
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			key={events[currentEventIndex].EVENT_ID}
			className="w-[20rem] md:w-[55rem] lg:w-[80rem]  h-[40rem] md:h-[25rem] lg:h-[35rem] flex items-center relative"
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
					<span>Dirección:</span> {events[currentEventIndex].EVENT_ADDRESS}
				</p>
				<p className="font-bold text-base px-2 italic">
					<span>Fecha:</span> {fecha[0]}
				</p>
				<p className="font-bold text-base px-2 italic">
					<span>Hora de inicio:</span> {events[currentEventIndex].EVENT_TIME}
				</p>
			</section>
		</motion.div>
	);
}

function Events() {
	const URL = "https://server.aquilabrand.cl/event";

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

	return (
		<div id="event-card" className="text-white relative ">
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

