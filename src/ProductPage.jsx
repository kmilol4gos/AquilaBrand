import { useCart } from "./hook/useCart";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import polera1 from "./assets/polera.png";
import polera2 from "./assets/polera2.png";
import polera4 from "./assets/polera4.png";
import { lazy } from "react";
import { TailSpin } from "react-loader-spinner";

function AgregarAlCarro({ product, color, size, addToCart }) {
	let filteredProduct = undefined;
	if (color !== undefined && size !== undefined) {
		filteredProduct = product[0].filter((item) => {
			return item.COLOR_ID === color && item.SIZE_ID === size;
		});
	}

	return (
		<button
			onClick={() => addToCart(filteredProduct[0])}
			className="ease-in-out duration-100 my-2 p-3 border-2 border-black text-white bg-black cursor-pointer text-base font-bold hover:bg-white hover:border-white hover:text-black"
		>
			Agregar al carrito
		</button>
	);
}

function Sizes({ SIZE_NAME, SIZE_ID, setSize }) {
	return (
		<div>
			<input type="radio" value={SIZE_ID} name="sizes" id={SIZE_NAME}></input>
			<label
				key={SIZE_NAME}
				htmlFor={SIZE_NAME}
				className="justify-center bg-black flex items-center p-2 w-12 h-12 text-lg hover:bg-white hover:text-black ease-in-out duration-100 cursor-pointer"
				onClick={() => setSize(SIZE_ID)}
			>
				{SIZE_NAME}
			</label>
		</div>
	);
}

function Colors({ product, setColor }) {
	return (
		<form
			id="color"
			className="flex py-2 w-12 justify-end gap-2 flex-row-reverse mb-2"
		>
			{product.map((color) => (
				<div>
					<input
						type="radio"
						value={color.COLOR_ID}
						name="colors"
						id={color.COLOR_NAME}
					></input>
					<label
						key={color.COLOR_NAME}
						htmlFor={color.COLOR_NAME}
						className="justify-center bg-black flex items-center p-2 h-12 text-lg hover:bg-white hover:text-black ease-in-out duration-100 cursor-pointer"
						onClick={() => setColor(color.COLOR_ID)}
					>
						{color.COLOR_NAME}
					</label>
				</div>
			))}
		</form>
	);
}

export default function ProductPage() {
	const { id } = useParams();

	const { addToCart } = useCart();

	const URL = "http://localhost:3000/product";

	const [product, setProduct] = useState();

	const [color, setColor] = useState();
	const [size, setSize] = useState();

	const fetchApi = async () => {
		const response = await fetch(URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				id: id,
			},
		});
		const responseJSON = await response.json();
		setProduct(responseJSON);
	};

	useEffect(() => {
		fetchApi();
	}, []);

	if (!product) {
		return (
			<div className="relative flex justify-center items-center w-screen h-screen">
				<TailSpin color="#e2fcef" height={80} width={80} />
			</div>
		);
	}

	//falta obtener el index del color y la talla seleccionada

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<section
				id="producto"
				className="relative flex items-stretch justify-center h-[36rem] text-white"
			>
				<div className="mr-10 self-center flex h-full gap-4">
					<img
						src={polera1}
						alt=""
						className="self-center w-full h-full object-cover rounded-lg"
					/>
					<div className="flex flex-col justify-between">
						<img
							src={polera2}
							alt=""
							className="w-60 h-60 object-cover rounded-lg"
						/>
						<img
							src={polera4}
							alt=""
							className="w-60 h-60 object-cover rounded-lg"
						/>
					</div>
				</div>
				<div className="h-[80%] flex flex-col justify-around m-2 w-80 font-bold self-center">
					<section className="flex flex-col gap-2 mb-3">
						<h1 className="text-4xl font-bold uppercase">
							{product[0][0].PRODUCT_NAME}
						</h1>
						<p className="w-full text-sm font-normal py-2">
							{product[0][0].PRODUCT_DESCRIPTION}
						</p>
					</section>
					<section>
						<span>Seleccionar talla</span>
						<form
							id="sizes"
							className="flex py-2 w-12 justify-end gap-2 flex-row-reverse mb-2"
						>
							{product[2].map((talla, index) => (
								<Sizes key={talla.SIZE_ID} setSize={setSize} {...talla} />
							))}
						</form>
						<span>Seleccionar color</span>
						<Colors product={product[1]} setColor={setColor} />
					</section>
					<span className="text-xl font-bold before:content-['$']">
						{product[0][0].PRECIO}
					</span>
					<div>
						<AgregarAlCarro
							product={product}
							color={color}
							size={size}
							addToCart={addToCart}
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
