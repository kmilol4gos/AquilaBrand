import ArrowDown from "./assets/Flecha-icon.svg";
import Aquila from "./assets/Logo_Aguila.png";
import WhatsApp from "./assets/WhatsApp-icon-w.svg";
import Instagram from "./assets/Instagram-icon-w.svg";
import Eventos from "./Events.jsx";
import { motion } from "framer-motion";

function AbautUs() {
	return (
		<section className="relative w-screen bg-black inline-block">
			<section
				className="relative top-20 w-full h-full flex flex-col items-center pb-32"
				id="eventos"
			>
				<h1 className="text-white p-10 uppercase font-bold text-3xl">
					Eventos
				</h1>
				<Eventos />
				<strong className="text-2xl uppercase text-white p-3">
					Mantente atento a los proximos eventos que puedan surgir!
				</strong>
				<div className="py-8">
					<a
						href="#QuienesSomos"
						className=" text-white p-2 rounded-md flex flex-col gap-2 items-center"
					>
						Conoce más sobre nosotros
						<motion.img
							src={ArrowDown}
							alt=""
							className="w-7"
							id="QuienesSomos"
							animate={{ y: [0, 5, 0] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						/>
					</a>
				</div>
			</section>
			<section className="relative w-screen mt-20 pb-20">
				<section className="flex flex-col md:flex-row justify-around items-center  w-full text-white gap-4">
					<div className="md:w-1/2 w-full flex flex-col items-center gap-12">
						<h1 className="text-center font-bold text-3xl p-2">
							Quienes Somos?
						</h1>
						<p className="font-medium text-xl w-2/3 text-center">
							AquilaBrand es una pequeña empresa de ropa urbana contemporánea
							que se destaca por sus diseños innovadores y materiales de alta
							calidad. Su filosofía se basa en la autoexpresión y la
							individualidad, ofreciendo prendas de vestir que reflejan el
							estilo de vida urbano y combinan influencias de la cultura urbana,
							el arte callejero y la música. Además, AquilaBrand se preocupa por
							la sostenibilidad y la responsabilidad social, utilizando
							materiales respetuosos con el medio ambiente y colaborando con
							fabricantes éticos. Con su enfoque en la moda urbana, la calidad y
							la autenticidad, se ha convertido en una opción confiable para
							aquellos que buscan ropa urbana única y con estilo.
						</p>
					</div>
					<div className="md:w-1/2 w-full flex flex-col gap-2 justify-center items-center">
						<img src={Aquila} alt="" className="bg-white p-2" />
						<h2 className="font-medium text-lg">
							Recuerda que puedes contactarnos desde nuestras redes sociales!
						</h2>
						<div className="flex justify-around w-1/2 py-2">
							<a href="#">
								<img src={WhatsApp} alt="" className="w-12" />
							</a>
							<a href="#">
								<img src={Instagram} alt="" className="w-12" />
							</a>
						</div>
					</div>
				</section>
			</section>
		</section>
	);
}

export default AbautUs;
