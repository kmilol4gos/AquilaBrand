import ReactDOM from "react-dom/client";
import { Route, Routes, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Logo from "./assets/Aguila_Sola.png";
import Menu from "./assets/HamburgerMenu.svg";
import Instagram from "./assets/Instagram-icon.svg";
import WhatsApp from "./assets/Whatsapp-icon.svg";
import ShoppingCart from "./assets/Shopping-cart.png";
import Header from "./Header";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<header className="w-full fixed top-0 z-50">
			<nav className="w-full h-20 flex items-center bg-mainColor z-50 justify-between shadow-lg relative">
				<picture className="order-5">
					<Link to="/Header">
						<img
							src={Logo}
							alt="Logo AquilaBrand"
							className="w-20 drop-shadow-aq hover:scale-110 duration-100 "
						/>
					</Link>
				</picture>
				<div className="order-1 flex items-center my-2 mx-8">
					<button className="border-none bg-transparent cursor-pointer hover:scale-110 duration-100">
						<img src={Menu} alt="" />
					</button>
				</div>
				<picture className="order-3">
					<a
						href="https://www.instagram.com/?hl=es"
						target="_blank"
						rel="noreferrer"
					>
						<img src={Instagram} alt="" />
					</a>
				</picture>
				<picture className="order-5">
					<a href="" rel="noreferrer" target="_blank">
						<img src={WhatsApp} alt="" />
					</a>
				</picture>
				<div className="my-2 mx-4 order-6">
					<button className="border-none bg-transparent cursor-pointer hover:scale-110 duration-100">
						<img
							src={ShoppingCart}
							alt=""
							className="w-12 m-2 drop-shadow-aq"
						/>
					</button>
				</div>
			</nav>
			<Routes>
				<Route path="/Header" element={<Header />} />;
			</Routes>
		</header>
	</BrowserRouter>
);
