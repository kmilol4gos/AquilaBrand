import { useState, useEffect } from "react";
import PoleraNegra from "./assets/polera2.png";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

export default function FeaturedProducts() {
	const URL = "http://localhost:3000/featured";

	const [featured, setFeatured] = useState();

	const fetchApi = async () => {
		const response = await fetch(URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const responseJSON = await response.json();
		setFeatured(responseJSON);
	};

	useEffect(() => {
		fetchApi();
	}, []);

	if (!featured)
		return (
			<div className="absolute flex justify-center w-screen h-screen">
				<TailSpin color="#e2fcef" height={80} width={80} />
			</div>
		);

	return featured.map((product, index) => (
		<div
			key={product.PRODUCT_ID}
			className="flex flex-col rounded-lg bg-white md:max-w-xl md:flex-row w-full"
		>
			<img
				src={PoleraNegra}
				alt=""
				className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
			/>
			<div className="flex flex-col justify-evenly p-6 w-full">
				<h1 className="mb-2 text-xl font-bold text-black uppercase">
					{product.PRODUCT_NAME}
				</h1>
				<p className="mb-4 text-base text-black">
					{product.PRODUCT_DESCRIPTION}
				</p>
				<Link
					to={"/product/" + product.PRODUCT_ID}
					className="flex justify-center bg-black text-white rounded-lg p-1"
				>
					Ir a comprar
				</Link>
			</div>
		</div>
	));
}
