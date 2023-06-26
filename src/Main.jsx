import ReactDOM from "react-dom/client";
import { Route, Routes, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Navbar from "./Navbar.jsx";
import Webpay from "./assets/logo-webpay.png";
import Catalogo from "./Catalogo.jsx";
import App from "./App";
import Events from "./Events";
import Products from "./Products";
import { CartProvider } from "./context/cart_context";
import { Cart } from "./Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<CartProvider>
		<BrowserRouter>
			<Navbar />
			<footer className="absolute bottom-0 h-60 mt-24 bg-black w-screen">
				<section className="mx-40 h-full flex justify-between items-stretch text-white">
					<div className="flex flex-col w-52">
						<h3 className="text-2xl font-normal my-4">Informacion</h3>
						<ul className="flex flex-col">
							<li>
								<Link
									to="/Catalogo"
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
			<Cart />
			<Routes>
				<Route path="/" element={<App />} />;
<<<<<<< HEAD
				<Route path="/Events" element={<Events />} />
				<Route path="/Catalogo" element={<Catalogo />} />
				<Route path="/" element={<App />} />
				<Route path="/" element={<App />} />
				<Route path="/" element={<App />} />
=======
				<Route path="/ropa" element={<Products category='ropa' section='all' />} />
				<Route path="/ropa/poleras" element={<Products category='ropa' section='poleras' />} />
				<Route path="/ropa/pantalones" element={<Products category='ropa' section='pantalones' />} />
				<Route path="/ropa/polerones" element={<Products category='ropa' section='polerones' />} />
				<Route path="/ropa/faldas" element={<Products category='ropa' section='faldas' />} />
				<Route path="/ropa/gorros" element={<Products category='ropa' section='gorros' />} />
				<Route path="/skate" element={<Products category='skate' section='all' />} />
				<Route path="/skate/ruedas" element={<Products category='skate' section='ruedas' />} />
				<Route path="/skate/tablas" element={<Products category='skate' section='tablas' />} />
				<Route path="/accesorios" element={<Products category='accesorios' section='all' />} />
				<Route path="/accesorios/bolsos" element={<Products category='accesorios' section='bolsos' />} />
				<Route path="/accesorios/pulseras" element={<Products category='accesorios' section='pulseras' />} />
				<Route path="/accesorios/collares" element={<Products category='accesorios' section='collares' />} />
				<Route path="/events" element={<Events />} />
>>>>>>> 791e57d5936db4f96a7017680d64e4ad770241b8
			</Routes>
		</BrowserRouter>
	</CartProvider>
);
