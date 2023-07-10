import "./index.css";
import ArrowIcon from "./assets/Flecha-icon.svg";
import Video from "./assets/video.mp4";
import FeaturedProducts from "./FeaturedProducts";
import { motion } from "framer-motion";
import Events from "./Events";

function App() {
	return (
		<main className="w-full pb-36 mb-36 ">
			<div className="relative w-screen h-screen flex justify-center items-center">
				<section className="relative w-full h-full z-40  ">
					<header className="absolute p-16 flex flex-col items-center top-20 w-full">
						<h1 className="text-white text-5xl font-bold drop-shadow-aq">
							AquilaBrand
						</h1>
						<h2 className="text-white text-3xl font-bold drop-shadow-aq">
							Ropa Urbana
						</h2>
					</header>
					<footer className="absolute bottom-0 left-0 w-full h-20 flex items-center justify-center">
						<a
							href="#ver-mas"
							className="px-4 py-2 gap-2 flex items-center justify-center rounded-md text-xl font-normal text-white backdrop-blur-2xl "
							id="ver-mas"
						>
							Ver más
							<motion.img
								animate={{ y: [0, 5, 0] }}
								transition={{ duration: 1.5, repeat: Infinity }}
								src={ArrowIcon}
								alt="Baja para ver mas"
							/>
						</a>
					</footer>
				</section>
				<section className="w-full h-full absolute pt-20">
					<video
						src={Video}
						muted
						autoPlay
						loop
						className="w-full h-full object-cover "
					/>
				</section>
			</div>
			<section className="mt-24 relative mx-8  inline-block">
				<div className="my-16 flex items-center justify-center">
					<h2 className="text-center text-white text-4xl font-bold drop-shadow-aq">
						Productos Destacados
					</h2>
				</div>
				<div className="relative grid justify-items-center grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-full w-full ">
					<FeaturedProducts />
				</div>
			</section>

			<section className="relative mt-24 flex flex-col">
				<div className="my-16 flex items-center justify-center">
					<h2 className="text-center text-white text-4xl font-bold drop-shadow-aq">
						Próximos Eventos
					</h2>
				</div>
				<Events />
			</section>
		</main>
	);
}

export default App;
