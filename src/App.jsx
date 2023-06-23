import "./index.css";
import ArrowIcon from "./assets/Flecha-icon.svg";
import Video from "./assets/video.mp4";

function App() {
	return (
		<main>
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
						className="w-full h-full object-cover"
					/>
				</section>
			</div>
		</main>
	);
}

export default App;
