import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./assets/Aguila_Sola.png";
import Instagram from "./assets/Instagram-icon.svg";
import WhatsApp from "./assets/Whatsapp-icon.svg";
import ShoppingCart from "./assets/Shopping-cart.png";
import IconMenu from "./assets/HamburgerMenu.svg";
import Cart from "./Cart";

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	const toggleCart = () => {
		setIsCartOpen(!isCartOpen);
	};
	const handleItemClick = () => {
		setIsOpen(false);
	};
	const handleCartClick = () => {
		setIsCartOpen(false);
	};

	return (
		<header className="w-screen fixed top-0 z-50">
			<nav className="w-screen h-20 flex items-center bg-mainColor z-50 justify-between shadow-lg relative">
				<picture className="order-5">
					<Link to="/">
						<img
							onClick={handleItemClick && handleCartClick}
							src={Logo}
							alt="Logo AquilaBrand"
							className="w-20 drop-shadow-aq hover:scale-110 duration-100 "
						/>
					</Link>
				</picture>
				<div className="order-1 flex items-center my-2 mx-8">
					<button
						onClick={toggleMenu}
						className="border-none bg-transparent cursor-pointer hover:scale-110 duration-100"
					>
						<img src={IconMenu} alt="" />
					</button>
				</div>
				<picture className="order-3 hidden md:block">
					<a
						href="https://www.instagram.com/aquila.brand_"
						target="_blank"
						rel="noreferrer"
					>
						<img src={Instagram} alt="" />
					</a>
				</picture>
				<picture className="order-5 hidden md:block">
					<a href="https://wa.me/56926937584" rel="noreferrer" target="_blank">
						<img src={WhatsApp} alt="" />
					</a>
				</picture>
				<div className="my-2 mx-4 order-6">
					<button
						onClick={toggleCart}
						className="border-none bg-transparent cursor-pointer hover:scale-110 duration-100"
					>
						<img
							src={ShoppingCart}
							alt=""
							className="w-12 m-2 drop-shadow-aq"
						/>
					</button>
				</div>
			</nav>
			<AnimatePresence>
				{isOpen && (
					<motion.nav
						initial={{ opacity: 0, y: -5 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -5 }}
						transition={{ duration: 0.3 }}
						id="dropdown-menu"
						className="fixed top-20 z-50 block w-full overflow-hidden rounded-bl-xl rounded-br-xl bg-black text-white"
					>
						<ul className="w-screen h-[28rem] flex flex-col justify-around gap-4 md:hidden">
							<li className="w-full text-center flex">
								<Link
									to="/ropa"
									className=" w-full text-2xl font-bold "
									onClick={handleItemClick}
								>
									Ropa
								</Link>
							</li>
							<li className="w-full flex text-center">
								<Link
									to="/skate"
									className=" w-full text-2xl font-bold "
									onClick={handleItemClick}
								>
									Skate
								</Link>
							</li>
							<li className="w-full flex text-center">
								<Link
									to="/accesorios"
									className=" w-full text-2xl font-bold "
									onClick={handleItemClick}
								>
									Accesorios
								</Link>
							</li>
							<li className="w-full flex text-center">
								<Link
									to="/Informacion"
									className=" w-full text-2xl font-bold "
									onClick={handleItemClick}
								>
									Información
								</Link>
							</li>
						</ul>
						<ul
							className="w-full list-none justify-around hidden md:flex
					[&>li]:mx-3 [&>li]:h-full [&>li]:w-72 [&>li]:flex [&>li]:flex-col [&>li]:items-center
					[&>li>a]:inline-block [&>li>a]:pt-3 [&>li>a]:pb-1 [&>li>a]:text-xl [&>li>a]:font-bold [&>li>a]:self-center [&>li>a]:w-36
					[&>li>div]:flex [&>li>div]:flex-col [&>li>div]:justify-center [&>li>div]:my-2
					[&>li>div>a]:text-s [&>li>div>a]:w-36 [&>li>div>a]:p-1 [&>li>div>a]:my-1 [&>li>div>a]:px-3 [&>li>div>a]:rounded"
						>
							<li >
								<Link
									to="/ropa"
									className="hover:bg-mainColor"
									onClick={handleItemClick}
								>
									Ropa
								</Link>
								<div>
									<Link
										to="/ropa/poleras"
										className="hover:bg-mainColor"
										onClick={handleItemClick}
									>
										Poleras
									</Link>
									<Link
										to="/ropa/pantalones"
										className="hover:bg-mainColor"
										onClick={handleItemClick}
									>
										Pantalones
									</Link>
									<Link
										to="/ropa/polerones"
										className="hover:bg-mainColor"
										onClick={handleItemClick}
									>
										Polerones
									</Link>
									<Link
										to="/ropa/faldas"
										className="hover:bg-mainColor"
										onClick={handleItemClick}
									>
										Faldas
									</Link>
								</div>
							</li>
							<li>
								<Link to="/skate" onClick={handleItemClick}>
									Skate
								</Link>
								<div>
									<Link
										to="/skate/ruedas"
										className="hover:bg-mainColor"
										onClick={handleItemClick}
									>
										Ruedas
									</Link>
									<Link
										to="/skate/tablas"
										className="hover:bg-mainColor"
										onClick={handleItemClick}
									>
										Tablas
									</Link>
								</div>
							</li>
							<li>
								<Link to="/accesorios" onClick={handleItemClick}>
									Accesorios
								</Link>
								<div>
									<Link
										to="/accesorios/bolsos"
										className="hover:bg-mainColor"
										onClick={handleItemClick}
									>
										Bolsos
									</Link>
									<Link
										to="/accesorios/pulseras"
										className="hover:bg-mainColor"
										onClick={handleItemClick}
									>
										Pulseras
									</Link>
									<Link
										to="/accesorios/collares"
										className="hover:bg-mainColor"
										onClick={handleItemClick}
									>
										Collares
									</Link>
								</div>
							</li>
							<li>
								<Link to="Informacion" onClick={handleItemClick}>
									Información
								</Link>
							</li>
						</ul>
					</motion.nav>
				)}
				{isCartOpen && <Cart open={setIsCartOpen} />}
			</AnimatePresence>
		</header>
	);
};

export default Menu;
