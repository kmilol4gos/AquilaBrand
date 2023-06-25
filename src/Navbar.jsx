import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "./assets/Aguila_Sola.png";
import Instagram from "./assets/Instagram-icon.svg";
import WhatsApp from "./assets/Whatsapp-icon.svg";
import ShoppingCart from "./assets/Shopping-cart.png";
import IconMenu from "./assets/HamburgerMenu.svg";

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	const toggleCart = () => {
		setIsCartOpen(!isCartOpen);
	};
	return (
		<header className="w-full fixed top-0 z-50">
			<nav className="w-full h-20 flex items-center bg-mainColor z-50 justify-between shadow-lg relative">
				<picture className="order-5">
					<Link to="/">
						<img
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
			{isOpen && (
				<nav
					id="dropdown-menu"
					className="fixed top-20 z-50 block w-full overflow-hidden rounded-bl-xl rounded-br-xl bg-black text-white"
				>
					<ul
						className="flex w-full list-none justify-around
					[&>li]:mx-3 [&>li]:h-full [&>li]:w-72 [&>li]:flex [&>li]:flex-col [&>li]:items-center
					[&>li>a]:inline-block [&>li>a]:pt-3 [&>li>a]:pb-1 [&>li>a]:text-xl [&>li>a]:font-bold [&>li>a]:self-center [&>li>a]:w-36
					[&>li>div]:flex [&>li>div]:flex-col [&>li>div]:justify-center [&>li>div]:my-2
					[&>li>div>a]:text-s [&>li>div>a]:w-36 [&>li>div>a]:p-1 [&>li>div>a]:my-1 [&>li>div>a]:px-3 [&>li>div>a]:rounded"
					>
						<li>
							<Link to="/Catalogo">Ropa</Link>
							<div>
								<Link to="/" className="hover:bg-mainColor">
									Poleras
								</Link>
								<Link to="/" className="hover:bg-mainColor">
									Pantalones
								</Link>
								<Link to="" className="hover:bg-mainColor">
									Polerones
								</Link>
								<Link to="" className="hover:bg-mainColor">
									Faldas
								</Link>
							</div>
						</li>
						<li>
							<Link to="/">Skate</Link>
							<div>
								<Link to="/" className="hover:bg-mainColor">
									Ruedas
								</Link>
								<Link to="/" className="hover:bg-mainColor">
									Tablas
								</Link>
							</div>
						</li>
						<li>
							<Link to="/">Accesorios</Link>
							<div>
								<Link to="/" className="hover:bg-mainColor">
									Bolsos
								</Link>
								<Link to="/" className="hover:bg-mainColor">
									Pulseras
								</Link>
								<Link to="/" className="hover:bg-mainColor">
									Collares
								</Link>
							</div>
						</li>
						<li>
							<Link to="Informacion">Informacion</Link>
							<div>
								<Link to="/" className="hover:bg-mainColor">
									Eventos
								</Link>
								<Link to="/" className="hover:bg-mainColor">
									Quienes Somos
								</Link>
								<Link to="/" className="hover:bg-mainColor">
									Contacto
								</Link>
							</div>
						</li>
					</ul>
				</nav>
			)}
			{isCartOpen && (
				<nav className="z-40 top-0 fixed right-0 h-screen flex flex-col w-[30rem]">
					<div className="w-full top-20 h-full relative bg-black">
						<div className="flex justify-center p-4 border-b-2 border-solid border-white">
							<h3 className="text-white px-6 text-2xl font-bold">Carrito</h3>
						</div>
						<div className="relative overflow-y-auto h-[71%]">
							<div className="flex flex-col">
								<div className="h-[85%]">Aqui va el producto</div>
							</div>
						</div>
					</div>
					<div className="border-t-2 border-solid border-white absolute w-full bottom-0 z-50 text-white bg-mainColor">
						<div className="flex justify-between items-center px-6 m-2">
							<h4>Productos</h4>
							<span className="text-sm font-medium">2</span>
						</div>
						<div className="flex justify-between items-center px-6 m-2">
							<h4>Total</h4>
							<span className="text-sm font-medium">$100.000</span>
						</div>
						<div className="flex justify-center w-full">
							<button className="w-full py-4 border-none bg-black text-white text-sm font-medium cursor-pointer ease-in-out duration-100 hover:text-black hover:bg-white">
								Finalizar Compra
							</button>
						</div>
					</div>
				</nav>
			)}
		</header>
	);
};

export default Menu;
