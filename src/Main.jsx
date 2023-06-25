import ReactDOM from "react-dom/client";
import { Route, Routes, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Navbar from "./Navbar.jsx";
import Webpay from "./assets/logo-webpay.png";
import Catalogo from "./Catalogo.jsx";
import App from "./App";
import Events from "./Events";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<>
		<BrowserRouter>
			<Navbar />
			<footer className="absolute bottom-0 h-60 mt-24 bg-black w-screen">
				<section className="mx-40 h-full flex justify-between items-stretch text-white">
					<div className="flex flex-col w-52">
						<h3 className="text-2xl font-normal my-4">Informacion</h3>
						<ul className="flex flex-col">
							<li>
								<Link
									to="/"
									className="font-normal text-lg py-2 hover:text-mainColor "
								>
									Eventos
								</Link>
							</li>
							<li>
								<Link
									to="/"
									className="font-normal text-lg py-2 hover:text-mainColor "
								>
									Quienes Somos
								</Link>
							</li>
							<li>
								<Link
									to="/"
									className="font-normal text-lg py-2 hover:text-mainColor "
								>
									Contacto
								</Link>
							</li>
						</ul>
					</div>
					<div className="flex flex-col w-52">
						<img src={Webpay} alt="Logo de WebPay" />
					</div>
					<div className="flex flex-col w-52">
						<h3 className="text-2xl font-normal my-4">Redes Sociales</h3>
						<ul className="flex flex-col">
							<li>
								<Link
									to=""
									className="font-normal text-lg my-2 hover:text-mainColor"
								>
									{" "}
									Instagram
								</Link>
							</li>
							<li>
								<Link
									to=""
									className="font-normal text-lg my-2 hover:text-mainColor"
								>
									{" "}
									WhatsApp
								</Link>
							</li>
						</ul>
					</div>
				</section>
			</footer>
			<Routes>
				<Route path="/" element={<App />} />;
				<Route path="/Catalogo" element={<Events />} />
				<Route path="/" element={<App />} />
				<Route path="/" element={<App />} />
				<Route path="/" element={<App />} />
				<Route path="/" element={<App />} />
			</Routes>
		</BrowserRouter>
	</>
);
