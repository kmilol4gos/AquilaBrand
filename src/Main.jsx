import ReactDOM from "react-dom/client";
import React, {StrictMode} from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import App from "./App";
import Events from "./Events";
import Products from "./Products";
import { CartProvider } from "./context/cart_context";
import Checkout from "./Checkout";
import Summary from "./Summary";
import ProductPage from "./ProductPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<>
			<BrowserRouter>
				<CartProvider>
					<Navbar />
					<Routes>
						<Route path="/" element={<App />} />;
						<Route
							path="/ropa"
							element={<Products category="ropa" section="all" />}
						/>
						<Route
							path="/ropa/poleras"
							element={<Products category="ropa" section="poleras" />}
						/>
						<Route
							path="/ropa/pantalones"
							element={<Products category="ropa" section="pantalones" />}
						/>
						<Route
							path="/ropa/polerones"
							element={<Products category="ropa" section="polerones" />}
						/>
						<Route
							path="/ropa/faldas"
							element={<Products category="ropa" section="faldas" />}
						/>
						<Route
							path="/ropa/gorros"
							element={<Products category="ropa" section="gorros" />}
						/>
						<Route
							path="/skate"
							element={<Products category="skate" section="all" />}
						/>
						<Route
							path="/skate/ruedas"
							element={<Products category="skate" section="ruedas" />}
						/>
						<Route
							path="/skate/tablas"
							element={<Products category="skate" section="tablas" />}
						/>
						<Route
							path="/accesorios"
							element={<Products category="accesorios" section="all" />}
						/>
						<Route
							path="/accesorios/bolsos"
							element={<Products category="accesorios" section="bolsos" />}
						/>
						<Route
							path="/accesorios/pulseras"
							element={<Products category="accesorios" section="pulseras" />}
						/>
						<Route
							path="/accesorios/collares"
							element={<Products category="accesorios" section="collares" />}
						/>
						<Route path="/events" element={<Events />} />
						<Route path="/checkout" element={<Checkout />} />
						<Route path="/summary" element={<Summary />} />
						<Route path="/product/:id" element={<ProductPage />} />
					</Routes>
					<Footer />
				</CartProvider>
			</BrowserRouter>
	</>
);
