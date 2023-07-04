import { useCart } from "./hook/useCart";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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

function MostrarImagenes({color, images, PRODUCT_NAME}) {

	let ImagePrincipal;
	let image2;
	let image3;
	if(color === undefined){
		ImagePrincipal = images[0].IMAGE;
		image2 = images[0].IMAGE_2;
		image3 = images[0].IMAGE_3;
	}
	const filterImages = images.filter((item) => item.COLOR_ID === color);
	if(!filterImages[0]){
	}
	else{
		ImagePrincipal = filterImages[0].IMAGE;
		image2 = filterImages[0].IMAGE_2;
		image3 = filterImages[0].IMAGE_3;
	}
	return(
		<div className="mr-10 self-center flex h-full gap-4">
			<img
				src={ImagePrincipal}
				alt=""
				className="self-center w-full h-full object-cover rounded-lg"
			/>
			<div className="flex flex-col justify-between">
				<img
					src={image2}
					alt=""
					className="w-60 h-60 object-cover rounded-lg"
				/>
				<img
					src={image3}
					alt=""
					className="w-60 h-60 object-cover rounded-lg"
				/>
			</div>
		</div>
	)
}


function Sizes({ SIZE_NAME, SIZE_ID, setSize }) {
	return (
		<div>
			<input type="radio" value={SIZE_ID} name="sizes" id={SIZE_NAME}></input>
			<label
				key={SIZE_NAME}
				htmlFor={SIZE_NAME}
				className="justify-center bg-black flex items-center p-2 w-12 h-12 text-base hover:bg-white hover:text-black ease-in-out duration-100 cursor-pointer"
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

	const [images, setImages] = useState([]);

	const URLIMG = "http://localhost:3000/images";

	const Imagenes = async () => {
		const response = await fetch(URLIMG, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				product: id,
			},

		});
		const responseJSON = await response.json();
		setImages(responseJSON);
	};

	useEffect(() => {
		fetchApi();
		Imagenes();
	}, []);

	if (!product || !images[0]) {
		return (
			<div className="relative flex justify-center items-center w-screen h-screen">
				<TailSpin color="#e2fcef" height={80} width={80} />
			</div>
		);
	}

	if(product[0].length === 0) {
		return (
			<Link to="*"/>
		)
	}

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<section
				id="producto"
				className="relative flex items-stretch justify-center h-[36rem] text-white"
			>
				<MostrarImagenes 
					color={color} 
					images={images}
					PRODUCT_NAME={product[0][0].PRODUCT_NAME}
				/>
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
