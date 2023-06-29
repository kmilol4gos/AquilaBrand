/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useCart } from "./hook/useCart";
import Polera from "./assets/polera2.png";
import img from "./assets/img-ejemplo.jpeg";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

function Product_Card({
	PRODUCT_ID,
	PRODUCT_NAME,
	PRODUCT_DESCRIPTION,
	PRECIO,
	addToCart,
}) {
	return (
		<div
			id="Product"
			key={PRODUCT_ID}
			className="flex my-4 mx-12 w-[32rem] pr-[30px] pl-[20px] py-[30px] bg-white rounded-3xl items-center"
		>
			<Link to="/" className="">
				<img
					src={Polera}
					alt={PRODUCT_NAME}
					className="object-cover box-content min-w-[12rem] max-w-[12rem] min-h-[13rem] max-h-[13rem] ml-[-60px] mr-[30px] rounded-3xl shadow-xl"
				/>
			</Link>
			<div className="flex flex-col justify-around h-60 w-60">
				<Link to="/" className="text-black text-xl font-bold uppercase">
					<h3>{PRODUCT_NAME}</h3>
				</Link>
				<p className="text-black font-normal text-sm">{PRODUCT_DESCRIPTION}</p>
				<span className="text-black text-xl font-bold before:content-['$']">
					{PRECIO}
				</span>
				<div className="flex w-full">
					<Link
						to={"/product/" + PRODUCT_ID}
						className="text-center w-full ease-in-out duration-100 m-2 p-2 border-2 border-black text-white bg-black font-bold cursor-pointer hover:bg-mainColor hover:border-mainColor"
					>
						Comprar
					</Link>
				</div>
			</div>
		</div>
	);
}

export default function Products(props) {
	const { addToCart, cart } = useCart();

	const [products, setProducts] = useState();
	const URL = "http://localhost:3000/products";

	const fetchApi = async () => {
		const response = await fetch(URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				category: props.category,
				section: props.section,
			},
		});
		const responseJSON = await response.json();
		setProducts(responseJSON);
	};

	useEffect(() => {
		fetchApi();
	}, []);

	if (!products) {
		return (
			<div className="flex justify-center items-center w-screen h-screen">
				<TailSpin color="#e2fcef" height={80} width={80} />
			</div>
		);
	}

	console.log(props);

	return (
		<div className="relative top-20 w-full">
			<section className="flex justify-center w-screen h-[35rem] items-center">
				<div className="flex flex-col w-full h-full m-8">
					<div className="w-full h-full flex relative ">
						<img src={img} alt="" className="w-full object-cover rounded-xl" />
						<div className="absolute flex flex-col text-center bottom-0 right-0 justify-center opacity-80 backdrop-blur-2xl h-40 w-auto ">
							<h2 className="drop-shadow-aq text-white text-4xl font-bold m-2">
								Nuestra Coleccion
							</h2>
							<span className="drop-shadow-aq text-white font-medium text-3xl m-2 ">
								Poleras/Polerones
							</span>
						</div>
					</div>
				</div>
			</section>
			<section className="m-4 grid grid-cols-2 justify-items-center relative pb-28">
				{!products ? (
					<div className=" absolute flex">
						<TailSpin color="#e2fcef" height={80} width={80} />
					</div> // me lo saco completamente del culo xd
				) : (
					products.map((product, index) => (
						<Product_Card
							key={product.PRODUCT_ID}
							addToCart={() => addToCart(product)}
							{...product}
						/>
					))
				)}
			</section>
		</div>
	);
}
