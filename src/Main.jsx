import ReactDOM from "react-dom/client";
import { useEffect } from "react";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
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
import "./index.css";

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

function Main() {
	return (
		<BrowserRouter>
			<ScrollToTop />
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
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
			</CartProvider>
		</BrowserRouter>
	);
}
export default Main;

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
