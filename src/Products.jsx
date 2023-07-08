/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useCart } from "./hook/useCart";
import Polera from "./assets/polera2.png";
import img from "./assets/img-ejemplo.jpeg";
import { Link, useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

function Product_Card({
	PRODUCT_ID,
	PRODUCT_NAME,
	PRODUCT_DESCRIPTION,
	PRECIO,
	addToCart,
	image,
}) {
	let ImagePrincipal;
	const filterImage = image.filter((item) => item.PRODUCT_ID === PRODUCT_ID);
	if (!filterImage[0]) {
		ImagePrincipal = { Polera };
	} else {
		ImagePrincipal = filterImage[0].IMAGE;
	}
	return (
		<div
			id="Product"
			key={PRODUCT_ID}
			className="flex flex-col md:flex-row my-4 p-4 w-[20rem] md:mx-12 md:w-[32rem] md:pr-[30px] md:pl-[20px] md:py-[30px] bg-white rounded-3xl items-center"
		>
			<Link to="/" className="md:w-56 h-52">
				<img
					src={ImagePrincipal}
					alt={PRODUCT_NAME}
					className="object-cover box-content w-56 h-52 md:ml-[-60px] md:mr-[30px] rounded-3xl shadow-xl"
				/>
			</Link>
			<div className="flex flex-col justify-around h-60 w-60">
				<Link to="/" className="text-black text-lg font-bold uppercase">
					<h3>{PRODUCT_NAME}</h3>
				</Link>
				<p className="text-black font-normal text-lg md:text-sm">{PRODUCT_DESCRIPTION}</p>
				<span className="text-black text-xl font-bold before:content-['$']">
					{PRECIO}
				</span>
				<div className="flex w-full">
					<Link
						to={"/product/" + PRODUCT_ID}
						className="text-center w-full ease-in-out duration-100 py-2 md:m-2 md:p-2 border-2 border-black text-white bg-black font-bold cursor-pointer hover:bg-mainColor hover:border-mainColor"
					>
						Comprar
					</Link>
				</div>
			</div>
		</div>
	);
}

export default function Products() {
	const { category, section } = useParams();
	const { addToCart, cart } = useCart();

	const [products, setProducts] = useState();

	const URL = "https://server.aquilabrand.cl/products";

	const fetchApi = async () => {
		const response = await fetch(URL +"?" + new URLSearchParams({category: category, section: section}), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const responseJSON = await response.json();
		console.log(responseJSON)
		setProducts(responseJSON);
	};

	const [images, setImages] = useState([]);

	const URLIMG = "https://server.aquilabrand.cl/images";

	const Imagenes = async () => {
		fetch(URLIMG +"?" + new URLSearchParams({category: category, section: section}), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setImages(data);
			});
	};

	useEffect(() => {
		fetchApi();
		Imagenes();
	}, [category, section]);

	if (!products || !images[0]) {
		return (
			<div className="flex justify-center items-center w-screen h-screen">
				<TailSpin color="#e2fcef" height={80} width={80} />
			</div>
		);
	}

	return (
		<div className="relative top-20 w-full">
			<section className="flex justify-center w-screen h-screen md:h-[35rem] items-center">
				<div className="flex flex-col w-full h-full md:m-8">
					<div className="w-full h-full flex relative ">
						<img src={img} alt="" className="w-full object-cover rounded-xl" />
						<div className="absolute flex flex-col text-center bottom-0 right-0 justify-center opacity-80 backdrop-blur-2xl h-40 w-full md:w-auto ">
							<h2 className="drop-shadow-aq text-white text-4xl font-bold m-2">
								Nuestra Coleccion
							</h2>
							<span className="drop-shadow-aq text-white font-medium text-3xl m-2 uppercase">
								{section === undefined ? category : category + "/" + section}
							</span>
						</div>
					</div>
				</div>
			</section>
			<section className="m-4 grid grid0-cols-1 md:grid-cols-2 justify-items-center relative pb-28">
				{!products ? (
					<div className=" absolute flex">
						<TailSpin color="#e2fcef" height={80} width={80} />
					</div>
				) : (
					products.map((product, index) => {
						return (
							<Product_Card
								key={product.PRODUCT_ID}
								addToCart={() => addToCart(product)}
								{...product}
								image={images}
							/>
						);
					})
				)}
			</section>
		</div>
	);
}
