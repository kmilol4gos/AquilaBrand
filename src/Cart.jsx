import { useCart } from "./hook/useCart";
import { Link } from "react-router-dom";
import AddIcon from "./assets/Add.svg";
import ImgProduct from "./assets/img-ejemplo.jpeg";
import DeleteIcon from "./assets/Delete.svg";
import { Cart_Amount, Cart_Cantidad } from "./hook/datosCart";
import Checkout from "./Checkout";

function CartProduct_Card({
	PRODUCT_NAME,
	SIZE_NAME,
	COLOR_NAME,
	PRECIO,
	quantity,
	addToCart,
	removeFromCart,
}) {
	return (
		<div className="my-2 flex flex-col justify-center bg-mainColor">
			<div className="flex w-[90%] items-stretch pt-4 pb-6" id="card-product">
				<div className="w-[30%] flex justify-center items-center mx-2">
					<Link to="/product/idproducto">
						<img
							src={ImgProduct}
							alt=""
							className="w-full object-cover border-none"
						/>
					</Link>
				</div>
				<div className="flex justify-center flex-grow items-stretch ml-2">
					<div className="w-full h-full flex flex-col justify-around text-white items-start">
						<Link to="/" className="font-bold text-xl no-underline">
							{PRODUCT_NAME}
						</Link>
						<div className="flex flex-col my-2">
							<span className="font-light text-xs">Talla: {SIZE_NAME}</span>
							<span className="font-light text-xs">Color: {COLOR_NAME}</span>
							<span className="font-light text-xs">Cantidad: {quantity}</span>
						</div>
						{/* <div className="pb-7">
							<span className="font-light text-xs">Cantidad: {quantity}</span>
							<button onClick={addToCart}>+</button>
						</div> */}
						<div>
							<span className="font-normal text-xl before:content-['$']">
								{PRECIO}
							</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-around">
					<button>
						<img src={DeleteIcon} alt="" onClick={removeFromCart} />
					</button>
					<button>
						<img src={AddIcon} alt="" onClick={addToCart} />
					</button>
				</div>
			</div>
		</div>
	);
}

export default function Cart() {
	const {
		cart,
		clearCart,
		addToCart,
		calcularTotal,
		removeFromCart,
		calcularCantidad,
	} = useCart();

	const carrito = cart;

	return (
		<nav className="z-40 top-0 fixed right-0 h-screen flex flex-col w-[30rem]">
			<div className="w-full top-20 h-full relative bg-black">
				<div className="flex justify-center p-4 border-b-2 border-solid border-white">
					<h3 className="text-white px-6 text-2xl font-bold">Carrito</h3>
				</div>
				<div className="relative overflow-y-auto h-[64%]">
					<div className="flex flex-col">
						<div className="h-[85%]">
							{cart.map((product) => (
								<CartProduct_Card
									key={product.PRODUCT_ID}
									addToCart={() => addToCart(product)}
									removeFromCart={() => removeFromCart(product)}
									{...product}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="border-t-2 border-solid border-white absolute w-full bottom-0 z-50 text-white bg-mainColor">
				<div className="flex justify-between items-center px-6 m-2">
					<h4>Productos</h4>
					<span className="text-sm font-medium">{<Cart_Cantidad />}</span>
				</div>
				<div className="flex justify-between items-center px-6 m-2">
					<h4>Total</h4>
					<span className="text-sm font-medium before:content-['$']">
						{<Cart_Amount />}
					</span>
				</div>
				<div className="flex justify-center w-full">
					<Link to="/checkout" className="text-center w-full py-4 border-none bg-black text-white text-sm font-medium cursor-pointer ease-in-out duration-100 hover:text-black hover:bg-white">
						Finalizar Compra
					</Link>
				</div>
			</div>
		</nav>
	);
}
