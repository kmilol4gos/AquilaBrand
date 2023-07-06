import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import App from "./App";
import Events from "./Events";
import Products from "./Products";
import { CartProvider } from "./context/cart_context";
import Checkout from "./checkout";
import Summary from "./Summary";
import ProductPage from "./ProductPage";
import AboutUs from "./AboutUs";
import NotFound from "./NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<>
		<BrowserRouter>
			<CartProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<App />} />;
					<Route path="/:category" element={<Products />} />
					<Route path="/:category/:section" element={<Products />} />
					<Route path="/Informacion" element={<AboutUs />}></Route>
					<Route path="/events" element={<Events />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/summary" element={<Summary />} />
					<Route path="/product/:id" element={<ProductPage />} />
					<Route path="*" element={<NotFound />}/>
				</Routes>
				<Footer />
			</CartProvider>
		</BrowserRouter>
	</>
);
