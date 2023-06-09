import { useCart } from "./hook/useCart";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";

function AgregarAlCarro({
	product,
	color,
	size,
	addToCart,
	setColor,
	setSize,
}) {
	const btn = document.getElementById("agregar-al-carrito");
	let mensaje = "Seleccione opciones";
	let text_boton = "Selecciona opciones";
	let disabled = true;
	let filteredProduct = [];
	if (color !== undefined && size !== undefined) {
		filteredProduct = product[0].filter((item) => {
			if (filteredProduct === []) {
				//no existe stock para el producto
				setColor(undefined);
				setSize(undefined);
				filteredProduct = [];
			}
			return item.COLOR_ID === color && item.SIZE_ID === size;
		});
	}
	if (
		filteredProduct[0] === undefined &&
		color !== undefined &&
		size !== undefined
	) {
		mensaje = "No disponible";
		disabled = true;
		text_boton = "No disponible";
	}
	if (
		filteredProduct[0] !== undefined &&
		color !== undefined &&
		size !== undefined
	) {
		mensaje = "Disponible";
		text_boton = "Agregar al carrito";
		disabled = false;
	}
	const [showModal, setShowModal] = useState(false);
	const HandleClick = () => {
		setShowModal(true);
		addToCart(filteredProduct[0]);
		setTimeout(() => {
			setShowModal(false);
		}, 3000);
	};
	return (
		<div className="border-t-2 md:border-none w-full">
			<span className="md:block flex justify-center text-base font-bold  py-2 md:border-none md:py-0">
				{mensaje}
			</span>
			<button
				id="agregar-al-carrito"
				disabled={disabled}
				onClick={() => {
					HandleClick();
				}}
				className="w-full md:w-auto ease-in-out duration-100 my-2 p-3 border-2 border-black text-white bg-black cursor-pointer text-base font-bold hover:bg-white hover:border-white hover:text-black"
			>
				<AnimatePresence>
					{showModal && (
						<motion.div
							initial={{ opacity: 0, y: 43, x: -13 }}
							animate={{ opacity: 1, y: 45, x: -15 }}
							exit={{ opacity: 0, x: -17 }}
							className="bg-white p-4 absolute cursor-default"
						>
							<h1 className=" text-black">
								Se ha añadido al carrito de compras
							</h1>
						</motion.div>
					)}
				</AnimatePresence>
				{text_boton}
			</button>
		</div>
	);
}

function MostrarImagenes({ color, images, PRODUCT_NAME }) {
	let ImagePrincipal;
	let image2;
	let image3;
	if (color === undefined) {
		ImagePrincipal = images[0].IMAGE;
		image2 = images[0].IMAGE_2;
		image3 = images[0].IMAGE_3;
	}
	const filterImages = images.filter((item) => item.COLOR_ID === color);
	if (!filterImages[0]) {
	} else {
		ImagePrincipal = filterImages[0].IMAGE;
		image2 = filterImages[0].IMAGE_2;
		image3 = filterImages[0].IMAGE_3;
	}
	return (
		<div className="md:mr-10 self-center flex flex-col md:flex-row h-full gap-4 mt-4 md:mt-0">
			<img
				src={ImagePrincipal}
				alt=""
				className="self-center w-60 h-60 md:w-[32rem] md:h-full object-cover rounded-lg"
			/>
			<div className="flex md:flex-col justify-between">
				<img
					src={image2}
					alt=""
					className="md:w-60 md:h-60 w-40  object-cover rounded-lg"
				/>
				<img
					src={image3}
					alt=""
					className="md:w-60 md:h-60 w-40 object-cover rounded-lg"
				/>
			</div>
		</div>
	);
}

function Sizes({ SIZE_NAME, SIZE_ID, setSize }) {
	return (
		<div>
			<input type="radio" value={SIZE_ID} name="sizes" id={SIZE_NAME}></input>
			<label
				key={SIZE_NAME}
				htmlFor={SIZE_NAME}
				className="justify-center bg-black flex items-center p-2 w-16 h-12 text-base hover:bg-white hover:text-black ease-in-out duration-100 cursor-pointer"
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
			className="flex py-2 w-12 justify-center md:justify-end gap-2 flex-row-reverse mb-2"
		>
			{product.map((color) => (
				<div key={color.COLOR_NAME}>
					<input
						type="radio"
						value={color.COLOR_ID}
						name="colors"
						id={color.COLOR_NAME}
					></input>
					<label
						htmlFor={color.COLOR_NAME}
						className="justify-center bg-black flex items-center p-2 h-12 text-base hover:bg-white hover:text-black ease-in-out duration-100 cursor-pointer"
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

	const URL = "https://server.aquilabrand.cl/product";

	const [product, setProduct] = useState([]);

	const [color, setColor] = useState();
	const [size, setSize] = useState();

	const fetchApi = async () => {
		const response = await fetch(URL + "?" + new URLSearchParams({ id: id }), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const responseJSON = await response.json();
		setProduct(responseJSON);
	};

	const [images, setImages] = useState([]);

	const URLIMG = "https://server.aquilabrand.cl/images";

	const Imagenes = async () => {
		const response = await fetch(
			URLIMG + "?" + new URLSearchParams({ id: id }),
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const responseJSON = await response.json();
		setImages(responseJSON);
	};

	useEffect(() => {
		fetchApi();
		Imagenes();
	}, []);

	if (!product[0] || !images[0]) {
		return (
			<div className="relative flex justify-center items-center w-screen h-screen">
				<TailSpin color="#e2fcef" height={80} width={80} />
			</div>
		);
	}

	if (product[0].length === 0) {
		return <Link to="*" />;
	}

	return (
		<div className="w-screen h-full flex justify-center items-center relative top-20 mb-36 pb-36 ">
			<section
				id="producto"
				className="relative flex h-full flex-col md:flex-row md:items-stretch justify-center md:h-[36rem] text-white md:mt-20"
			>
				<div>
					<MostrarImagenes
						color={color}
						images={images}
						PRODUCT_NAME={product[0][0].PRODUCT_NAME}
					/>
				</div>
				<div className="h-[80%] flex flex-col justify-around m-2 w-80 font-bold self-center">
					<section className="flex flex-col gap-2 mb-3 border-b-2 md:border-none">
						<h1 className="text-center md:text-start text-4xl font-bold uppercase">
							{product[0][0].PRODUCT_NAME}
						</h1>
						<span className="md:block flex justify-center text-xl font-bold before:content-['$'] border-t-2 py-2 md:border-none md:py-0">
							{product[0][0].PRECIO}
						</span>
						<p className="w-full text-center md:text-start md:text-base font-normal py-2">
							{product[0][0].PRODUCT_DESCRIPTION}
						</p>
					</section>
					<section className="w-full flex flex-col items-center md:block">
						<span className="text-lg md:text-base">Seleccionar talla</span>
						<form
							id="sizes"
							className="flex py-2 w-12 justify-center md:justify-start gap-2 mb-2"
						>
							{product[2].map((talla, index) => (
								<Sizes key={talla.SIZE_ID} setSize={setSize} {...talla} />
							))}
						</form>
						<span className="text-lg md:text-base">Seleccionar color</span>
						<Colors product={product[1]} setColor={setColor} />
					</section>

					<div className="flex justify-center md:block ">
						<AgregarAlCarro
							product={product}
							color={color}
							size={size}
							addToCart={addToCart}
							setColor={setColor}
							setSize={setSize}
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
