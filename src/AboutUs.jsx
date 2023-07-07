import Evento from "./assets/img-ejemplo.jpeg";
import ArrowRight from "./assets/ArrowRight.svg";
import ArrowLeft from "./assets/ArrowLeft.svg";
import ArrowDown from "./assets/Flecha-icon.svg";
import Aquila from "./assets/Logo_Aguila.png";
import WhatsApp from "./assets/WhatsApp-icon-w.svg";
import Instagram from "./assets/Instagram-icon-w.svg";
import Eventos from "./Events.jsx";

function AbautUs() {
	return (
		<section className="relative w-screen bg-black inline-block">
			<section
				className="relative top-20 w-full h-full flex flex-col gap-5 items-center pb-32"
				id="eventos"
			>
				<h1 className="text-white p-10 uppercase font-bold text-3xl">
					Eventos
				</h1>
				<div className="flex ">
					<button>
						<img src={ArrowLeft} alt="" />
					</button>
					<Eventos />
					<button>
						<img src={ArrowRight} alt="" />
					</button>
				</div>
				{/* <div className="w-full flex justify-center items-center">
					<section className="w-[80%] flex justify-center h-[30rem] relative">
						<img src={Evento} alt="" className="w-full h-full object-cover" />
						<div className="absolute w-full bottom-0 flex flex-col backdrop-blur-md text-white h-auto justify-around">
							<h1 className="font-bold text-2xl p-2 uppercase">
								Lanzamiento de nuestra coleccion
							</h1>
							<p className="font-bold text-base p-2">
								En este evento mostraremos nuestras mejores colecciones de
								verano del año 2023
							</p>
							<p className="font-bold text-base p-2">Fecha: 27/05/2024</p>
						</div>
					</section>
				</div> */}
				<strong className="text-2xl uppercase text-white p-3">
					Mantente atento a los proximos eventos que puedan surgir!
				</strong>
				<div className="py-10">
					<a
						href="#QuienesSomos"
						className=" text-white p-2 rounded-md flex flex-col gap-2 items-center"
					>
						Conoce más sobre nosotros
						<img src={ArrowDown} alt="" className="w-7" id="QuienesSomos" />
					</a>
				</div>
			</section>
			<section className="relative w-screen mt-36 pb-36">
				<section className="flex flex-col justify-around items-center  w-full text-white gap-4">
					<div className="md:w-1/2 w-full flex flex-col items-center gap-12">
						<h1 className="text-center font-bold text-3xl p-2">Quienes Somos?</h1>
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
