import "./index.css";
import ArrowIcon from "./assets/Flecha-icon.svg";
import Video from "./assets/video.mp4";
import PoleraNegra from "./assets/img-ejemplo.jpeg";
import { Link } from "react-router-dom";
import { CartProvider } from "./context/cart";
import { Cart } from "./Cart";

function App() {
	return (
		<main className="absolute">
			<div className="relative w-screen h-[90vh] flex overflow-hidden justify-center items-center top-20">
				<section className="absolute top-0 left-0 w-full h-full z-40">
					<header className="p-16 flex flex-col items-center">
						<h1 className="text-white text-5xl font-bold drop-shadow-aq">
							AquilaBrand
						</h1>
						<h2 className="text-white text-3xl font-bold drop-shadow-aq">
							Ropa Urbana
						</h2>
					</header>
					<footer
						id="footer-main"
						className="absolute bottom-0 left-0 w-full h-20 flex items-center justify-center"
					>
						<a
							href="#footer-main"
							className="px-4 py-2 flex items-center justify-center rounded-md text-xl font-normal text-white backdrop-blur-2xl"
						>
							Ver más
							<img src={ArrowIcon} alt="Baja para ver mas" />
						</a>
					</footer>
				</section>
				<section className="w-full h-full">
					<video
						src={Video}
						muted
						autoPlay
						loop
						className="w-full h-full object-cover "
					/>
				</section>
			</div>
			<section className="mt-36 relative mx-8 h-[30rem]">
				<div className="my-16 flex items-center justify-center">
					<h2 className="text-white text-4xl font-bold drop-shadow-aq">
						Productos Destacados
					</h2>
				</div>
				<div className="absolute grid right-0 justify-items-center grid-cols-3 grid-rows-2 gap-4 h-full w-full">
					<div className="flex flex-col rounded-lg bg-white md:max-w-xl md:flex-row w-full">
						<img
							src={PoleraNegra}
							alt=""
							className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
						/>
						<div className="flex flex-col justify-evenly p-6">
							<h5 className="mb-2 text-xl font-medium text-black">
								Polera Negra
							</h5>
							<p className="mb-4 text-base text-black">
								no se que poner en la descripcion de este producto
							</p>
							<Link
								to="/"
								className="flex justify-center bg-black text-white rounded-lg p-1"
							>
								ir a comprar
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

export default App;
